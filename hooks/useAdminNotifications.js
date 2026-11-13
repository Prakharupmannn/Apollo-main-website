
"use client";

import { useCallback, useEffect, useState } from "react";

const API = "/api/admin/notifications";
const REFRESH_INTERVAL = 30000;

export function useAdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);

    try {
      const response = await fetch(`${API}?limit=20`, {
        credentials: "same-origin",
        cache: "no-store",
      });

      if (response.status === 401) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      if (!response.ok) {
        throw new Error("Notification fetch failed");
      }

      const data = await response.json();

      if (data.success) {
        setNotifications(data.notifications || []);
        setUnreadCount(Number(data.unreadCount) || 0);
      }
    } catch (error) {
      console.error("Notification fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchNotifications(true);
      }
    }, REFRESH_INTERVAL);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchNotifications(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    const previous = notifications.find((item) => item.id === id);

    if (!previous || previous.is_read) return true;

    setNotifications((old) =>
      old.map((item) =>
        item.id === id ? { ...item, is_read: true } : item
      )
    );

    setUnreadCount((old) => Math.max(0, old - 1));

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PATCH",
        credentials: "same-origin",
      });

      if (!response.ok) {
        await fetchNotifications(true);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Mark notification read error:", error);
      await fetchNotifications(true);
      return false;
    }
  }, [notifications, fetchNotifications]);

  const markAllAsRead = useCallback(async () => {
    const previous = notifications;
    const previousCount = unreadCount;

    setNotifications((old) =>
      old.map((item) => ({ ...item, is_read: true }))
    );

    setUnreadCount(0);

    try {
      const response = await fetch(`${API}/read-all`, {
        method: "PATCH",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Unable to mark all as read");
      }

      return true;
    } catch (error) {
      console.error("Mark all read error:", error);

      setNotifications(previous);
      setUnreadCount(previousCount);

      return false;
    }
  }, [notifications, unreadCount]);

  const deleteNotification = useCallback(async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Unable to delete notification");
      }

      await fetchNotifications(true);
      return true;
    } catch (error) {
      console.error("Delete notification error:", error);
      await fetchNotifications(true);
      return false;
    }
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}

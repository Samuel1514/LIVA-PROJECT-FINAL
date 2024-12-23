// Listener for push events
self.addEventListener('push', event => {
    // Ensure the event has data
    if (!event.data) {
        console.error('Push event triggered, but no data available.');
        return;
    }

    // Parse the push notification payload
    const data = event.data.json();

    const title = data.notification.title || 'Notification';
    const options = {
        body: data.notification.body || 'You have a new message.',
        icon: data.notification.icon || 'default_icon.png', // Use a default icon if none provided
        badge: data.notification.badge || 'default_badge.png', // Optional badge icon
        actions: [
            { action: 'open', title: 'Open App' }, // Add action buttons (optional)
        ],
        requireInteraction: true, // Keep the notification until user interacts
    };

    // Display the notification
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Optional: Add behavior for notification actions and clicks
self.addEventListener('notificationclick', event => {
    event.notification.close(); // Close the notification

    const action = event.action;

    if (action === 'open') {
        // Handle the 'open' action
        event.waitUntil(
            clients.openWindow('http://localhost:3000') // Open app or specific URL
        );
    } else {
        // Default behavior for any other click
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
                if (clientList.length > 0) {
                    // Focus on the first matching client
                    return clientList[0].focus();
                } else {
                    // Open a new window if no clients are open
                    return clients.openWindow('http://localhost:3000');
                }
            })
        );
    }
});

// Optional: Handle service worker activation to ensure updates
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

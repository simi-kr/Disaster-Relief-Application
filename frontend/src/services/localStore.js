const REQUESTS_KEY = 'reliefRequests';
const STORE_EVENT = 'resilio-store-updated';

const readCollection = (key, fallback = []) => {
    try {
        const value = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
        return Array.isArray(value) ? value : fallback;
    } catch {
        return fallback;
    }
};

export const readCollectionByKey = (key, fallback = []) => readCollection(key, fallback);

export const writeCollection = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key } }));
};

export const subscribeToKey = (key, handler) => {
    const listener = event => {
        if (!event.detail || event.detail.key === key) handler();
    };
    window.addEventListener(STORE_EVENT, listener);
    window.addEventListener('storage', listener);
    return () => {
        window.removeEventListener(STORE_EVENT, listener);
        window.removeEventListener('storage', listener);
    };
};

export const readRequests = () => {
    try {
        const value = JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]');
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
};

export const writeRequests = (requests) => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
    window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key: REQUESTS_KEY } }));
};

export const subscribeToStore = (handler) => {
    const listener = (event) => {
        if (!event.detail || event.detail.key) handler();
    };
    window.addEventListener(STORE_EVENT, listener);
    window.addEventListener('storage', listener);
    return () => {
        window.removeEventListener(STORE_EVENT, listener);
        window.removeEventListener('storage', listener);
    };
};

export const getRegisteredUsers = () => {
    return readCollection('registeredUsers');
};

export const readDisasters = () => readCollection('disasters');

export const readResources = () => readCollection('resources');

export const readVolunteers = () => readCollection('volunteers');

export const writeVolunteers = volunteers => writeCollection('volunteers', volunteers);

export const readReliefCenters = () => readCollection('reliefCenters');

export const readNotifications = () => readCollection('notifications');

export const writeNotifications = notifications => writeCollection('notifications', notifications);

export const addNotification = notification => writeNotifications([
    { id: Date.now(), createdAt: new Date().toISOString(), ...notification },
    ...readNotifications()
]);

export const deleteNotification = id => writeNotifications(readNotifications().filter(notification => notification.id !== id));

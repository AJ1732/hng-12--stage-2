import { FormData } from "@/schema/form";

export const DB_NAME = 'MultiStepFormDB';
export const STORE_NAME = 'formData';

export interface StoredFormData {
  formData: FormData;
  currentStep: number;
  isFormSubmitted: boolean;
}

const defaultFormState: StoredFormData = {
  formData: {
    ticket_type: "regular",
    number_of_tickets: 1,
    profile_photo: "",
    name: "",
    email: "",
    about_project: "",
  },
  currentStep: 1,
  isFormSubmitted: false,
};

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME);
        store.put(defaultFormState, 'currentForm');
      }
    };
  });
};

export const saveFormData = async (data: StoredFormData): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(data, 'currentForm');

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

export const getFormData = async (): Promise<StoredFormData> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('currentForm');

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      resolve(request.result || defaultFormState);
    };
  });
};
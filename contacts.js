import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contact.json");

const updateContacts = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

// TODO: задокументировать каждую функцию
export const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
  // ...твой код. Возвращает массив контактов.
};

export const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === id);

  return contact || null;

  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
};

export const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
};

export const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);

  return newContact;

  // ...твой код. Возвращает объект добавленного контакта.
};

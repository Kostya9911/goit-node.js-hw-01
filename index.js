import { program } from "commander";
import * as contactService from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);
    case "get":
      const getContact = await contactService.getContactById(id);
      return console.log(getContact);
    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const removedContact = await contactService.removeContact(id);
      return console.log(removedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");
program.parse();

const options = program.opts();
invokeAction(options);

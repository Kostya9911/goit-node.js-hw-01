import yargs from "yargs";
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

// const { argv } = yargs(process.argv.slice(2));
// invokeAction(argv);

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");
program.parse();

const options = program.opts();
invokeAction(options);

// invokeAction({ action: "get", id: "drsAJ4SHPYqZeG-83QTVW" });
// invokeAction({
//   action: "add",
//   name: "Jamie Vardy",
//   email: "j.vardy@mail.com",
//   phone: "(568) 458-63-56",
// });

// invokeAction({ action: "remove", id: "V4_zZG_EdwMzXKMf3Mlel" });

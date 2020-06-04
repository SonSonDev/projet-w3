const bcrypt = require("bcryptjs");
const { prisma } = require("./generated/prisma-client");

(async function () {
  await prisma.createUser({ 
    firstName: "{{ user_firstName }}",
    lastName: "{{ user_lastName }}",
    email: "{{ user_email }}",
    password: await bcrypt.hash("{{ user_password }}", 10),
    role: "SUPER_ADMIN"
  })
})()

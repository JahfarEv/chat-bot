// const qrcode = require("qrcode-terminal");
// const { Client, LocalAuth } = require("whatsapp-web.js");
// const axios = require("axios");

// // Initialize the WhatsApp client
// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: { headless: true },
// });

// // Generate the QR code for WhatsApp authentication
// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// // Once the bot is ready
// client.on("ready", () => {
//   console.log("WhatsApp Bot is ready!");
// });

// // Function to fetch doctors from the API
// async function fetchDoctors() {
//   try {
//     const response = await axios.get(
//       "https://www.api.vyzo.in/api/customer/doctor"
//     );
//     console.log(response.data); // Log the entire response to understand its structure
//     return response.data.data; // Return the list of doctors
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     return [];
//   }
// }

// // Function to fetch the current token for a doctor
// async function fetchDoctorStatus(doctorId) {
//   try {
//     const response = await axios.get(
//       `https://www.api.vyzo.in/api/customer/liveStatus/${doctorId}`
//     );
//     return response.data.data; // Adjust this based on your API response structure
//   } catch (error) {
//     console.error("Error fetching doctor status:", error);
//     return null;
//   }
// }

// // Listen for messages
// client.on("message", async (message) => {
//   const content = message.body.toLowerCase();

//   // Start the bot and fetch doctors directly on any input (except 'start')
//   if (content === "start") {
//     await message.reply(
//       "VYZO-യിലേക്ക് സ്വാഗതം🙏 ഞങ്ങളിൽ ലഭ്യമായ ഡോക്ടർമാരുടെ വിവരം താഴെ കാണിക്കുന്നു.."
//     );

//     const doctors = await fetchDoctors();

//     if (doctors.length > 0) {
//       let doctorList = "Available Doctors:\n";
//       doctors.forEach((doctor, index) => {
//         doctorList += `${index + 1}. ${doctor.name} - ${doctor.hospital}\n`; // Displaying serial number, name, and hospital
//       });
//       await message.reply(
//         doctorList +
//           "\nദയവായി നിങ്ങളുടെ ഡോക്ടറുടെ ടോക്കൺ നില അറിയുവാൻ നമ്പർ ടൈപ്പ് ചെയ്യുക."
//       );
//     } else {
//       await message.reply(
//         "നിലവിൽ VYZO-യിൽ ഒരു ഡോക്ടറെയും കാണാൻ സാധിക്കുന്നില്ല."
//       );
//     }
//   } else if (!isNaN(content)) {
//     // Check if content is a number (doctor selection)
//     const serialNumber = parseInt(content);
//     const doctors = await fetchDoctors(); // Fetch the doctors again to get the latest list

//     if (serialNumber > 0 && serialNumber <= doctors.length) {
//       const doctor = doctors[serialNumber - 1]; // Access the doctor based on the serial number
//       await message.reply(
//         `നിങ്ങൾ ${doctor.hospital} ആശുപത്രിയിലെ Dr. ${doctor.name} നെ തെരഞ്ഞെടുത്തു. ഇപ്പോൾ നിലവിലെ ടോക്കൻ പരിശോധിക്കുന്നു...`
//       );

//       // Fetch and display the current token for the selected doctor
//       const doctorStatus = await fetchDoctorStatus(doctor._id); // Use the _id for querying
//       if (doctorStatus) {
//         // Construct the waiting room link using the doctor's ID
//         const waitingRoomLink = `https://vyzo-waitingroom.netlify.app/details?id=${doctor._id}`;
//         // Check if doctorStatus.currentToken exists, otherwise use doctorStatus.doctorStatus
//         const tokenMessage = doctorStatus.currentToken
//           ? `നിലവിലെ ടോക്കൺ നമ്പർ: ${doctorStatus.currentToken}`
//           : `നിലവിലെ സ്ഥിതി: ${doctorStatus.doctorStatus}`;

//         // Reply with the appropriate message
//         await message.reply(
//           `\n${tokenMessage}\n\nതുടർന്നുള്ള വിവരങ്ങൾ അറിയുവാൻ: ${waitingRoomLink}`
//         );
//       } else {
//         await message.reply(
//           `ക്ഷമിക്കണം, ഡോ. ${doctor.name} എന്നയാളുടെ നിലവിലെ ടോക്കൺ അറിയുവാൻ ഇപ്പോൾ സാധ്യമല്ല`
//         );
//       }
//     } else {
//       await message.reply(
//         "നിങ്ങൾ തിരഞ്ഞെടുത്തത് തെറ്റാണ്. ശരിയായ ഡോക്ടർ നമ്പർ തിരഞ്ഞെടുക്കുക."
//       );
//     }
//   } else {
//     // Any other input directly lists the available doctors
//     const doctors = await fetchDoctors();

//     if (doctors.length > 0) {
//       let doctorList = "Available Doctors:\n";
//       doctors.forEach((doctor, index) => {
//         doctorList += `${index + 1}. ${doctor.name} - ${doctor.hospital}\n`; // Displaying serial number, name, and hospital
//       });
//       await message.reply(
//         doctorList +
//           "\nദയവായി നിങ്ങൾ തിരഞ്ഞെടുക്കാൻ ആഗ്രഹിക്കുന്ന ഡോക്ടറുടെ നമ്പർ ടൈപ്പ് ചെയ്യുക"
//       );
//     } else {
//       await message.reply("No doctors available at the moment.");
//     }
//   }
// });

// // Start the WhatsApp client
// client.initialize();

// const qrcode = require("qrcode-terminal");
// const { Client, LocalAuth } = require("whatsapp-web.js");
// const axios = require("axios");
// const express = require("express");
// const app = express();

// // Initialize the WhatsApp client
// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: { headless: true },
// });

// // Generate the QR code for WhatsApp authentication
// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// // Once the bot is ready
// client.on("ready", () => {
//   console.log("WhatsApp Bot is ready!");
// });

// // Function to fetch doctors from the API
// async function fetchDoctors() {
//   try {
//     const response = await axios.get(
//       "https://www.api.vyzo.in/api/customer/doctor"
//     );
//     return response.data.data; // Return the list of doctors
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     return [];
//   }
// }

// // Function to fetch the current token for a doctor
// async function fetchDoctorStatus(doctorId) {
//   try {
//     const response = await axios.get(
//       `https://www.api.vyzo.in/api/customer/liveStatus/${doctorId}`
//     );
//     return response.data.data; // Adjust this based on your API response structure
//   } catch (error) {
//     console.error("Error fetching doctor status:", error);
//     return null;
//   }
// }

// // Listen for messages on WhatsApp
// client.on("message", async (message) => {
//   const content = message.body.toLowerCase();

//   // Handle the logic as before
//   if (content === "start") {
//     await message.reply("VYZO-യിലേക്ക് സ്വാഗതം🙏...");
//     const doctors = await fetchDoctors();

//     if (doctors.length > 0) {
//       let doctorList = "ഞങ്ങളിൽ ലഭ്യമായ ഡോക്ടർമാരുടെ വിവരം താഴെ കാണിക്കുന്നു:\n";
//       doctors.forEach((doctor, index) => {
//         doctorList += `${index + 1}. ${doctor.name} - ${doctor.hospital}\n`;
//       });
//       await message.reply(
//         doctorList + "ദയവായി നിങ്ങളുടെ ഡോക്ടറുടെ ടോക്കൺ നില അറിയുവാൻ നമ്പർ ടൈപ്പ് ചെയ്യുക"
//       );
//     } else {
//       await message.reply("നിലവിൽ VYZO-യിൽ ഒരു ഡോക്ടറെയും കാണാൻ സാധിക്കുന്നില്ല.");
//     }
//   } else if (!isNaN(content)) {
//     const serialNumber = parseInt(content);
//     const doctors = await fetchDoctors();

//     if (serialNumber > 0 && serialNumber <= doctors.length) {
//       const doctor = doctors[serialNumber - 1];
//       await message.reply(`നിങ്ങൾ ${doctor.hospital} ആശുപത്രിയിലെ Dr. ${doctor.name} നെ തെരഞ്ഞെടുത്തു. ഇപ്പോൾ നിലവിലെ ടോക്കൻ പരിശോധിക്കുന്നു...`);
//       const doctorStatus = await fetchDoctorStatus(doctor._id);

//       if (doctorStatus) {
//         const waitingRoomLink = `https://vyzo-waitingroom.netlify.app/details?id=${doctor._id}`;
//         const tokenMessage = doctorStatus.currentToken
//           ? `നിലവിലെ ടോക്കൺ നമ്പർ: ${doctorStatus.currentToken}`
//           : `നിലവിലെ സ്ഥിതി: ${doctorStatus.doctorStatus}`;

//         await message.reply(`${tokenMessage}\nLink: ${waitingRoomLink}`);
//       } else {
//         await message.reply(`Sorry, can't fetch the token for Dr. ${doctor.name}`);
//       }
//     } else {
//       await message.reply("Invalid doctor number.");
//     }
//   }
// });

// // Start the WhatsApp client
// client.initialize();

// // Set up Express server to render some web content
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to the WhatsApp Bot Service!</h1>");
// });

// app.get("/doctors", async (req, res) => {
//   const doctors = await fetchDoctors();
//   if (doctors.length > 0) {
//     let doctorList = "<h2>Available Doctors:</h2><ul>";
//     doctors.forEach((doctor, index) => {
//       doctorList += `<li>${index + 1}. ${doctor.name} - ${doctor.hospital}</li>`;
//     });
//     doctorList += "</ul>";
//     res.send(doctorList);
//   } else {
//     res.send("<h2>No doctors available at the moment.</h2>");
//   }
// });

// // Start the Express server on port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const qrcode = require("qrcode-terminal");
// const { Client, LocalAuth } = require("whatsapp-web.js");
// const axios = require("axios");
// const express = require("express");
// const app = express();

// // Initialize the WhatsApp client
// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: { headless: true },
// });

// // Define the default name for the bot
// const botName = "VYZO Bot";  // Change this to whatever default name you want

// // Generate the QR code for WhatsApp authentication
// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// // Once the bot is ready
// client.on("ready", () => {
//   console.log("WhatsApp Bot is ready!");
// });

// // Function to fetch doctors from the API
// async function fetchDoctors() {
//   try {
//     const response = await axios.get(
//       "https://www.api.vyzo.in/api/customer/doctor"
//     );
//     return response.data.data; // Return the list of doctors
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     return [];
//   }
// }

// // Function to fetch the current token for a doctor
// async function fetchDoctorStatus(doctorId) {
//   try {
//     const response = await axios.get(
//       `https://www.api.vyzo.in/api/customer/liveStatus/${doctorId}`
//     );
//     return response.data.data; // Adjust this based on your API response structure
//   } catch (error) {
//     console.error("Error fetching doctor status:", error);
//     return null;
//   }
// }

// // Listen for messages on WhatsApp
// client.on("message", async (message) => {
  
//   const content = message.body.toLowerCase();

//   // Handle the logic as before
//   if (content) {
//     await message.reply(`VYZO-യിലേക്ക് സ്വാഗതം🙏...`);
//     const doctors = await fetchDoctors();

//     if (doctors.length > 0) {
//       let doctorList = "ഞങ്ങളിൽ ലഭ്യമായ ഡോക്ടർമാരുടെ വിവരം താഴെ കാണിക്കുന്നു:\n";
//       doctors.forEach((doctor, index) => {
//         doctorList += `${index + 1}. ${doctor.name} - ${doctor.hospital}\n`;
//       });
//       await message.reply(
//         doctorList + "ദയവായി നിങ്ങളുടെ ഡോക്ടറുടെ ടോക്കൺ നില അറിയുവാൻ നമ്പർ ടൈപ്പ് ചെയ്യുക"
//       );
//     } else {
//       await message.reply(`നിലവിൽ VYZO-യിൽ ഒരു ഡോക്ടറെയും കാണാൻ സാധിക്കുന്നില്ല.`);
//     }
//   } else if (!isNaN(content)) {
//     const serialNumber = parseInt(content);
//     const doctors = await fetchDoctors();

//     if (serialNumber > 0 && serialNumber <= doctors.length) {
//       const doctor = doctors[serialNumber - 1];
//       await message.reply(`നിങ്ങൾ ${doctor.hospital} ആശുപത്രിയിലെ Dr. ${doctor.name} നെ തെരഞ്ഞെടുത്തു. ഇപ്പോൾ നിലവിലെ ടോക്കൻ പരിശോധിക്കുന്നു...`);
//       const doctorStatus = await fetchDoctorStatus(doctor._id);

//       if (doctorStatus) {
//         const waitingRoomLink = `https://vyzo-waitingroom.netlify.app/details?id=${doctor._id}`;
//         const tokenMessage = doctorStatus.currentToken
//           ? `നിലവിലെ ടോക്കൺ നമ്പർ: ${doctorStatus.currentToken}`
//           : `നിലവിലെ സ്ഥിതി: ${doctorStatus.doctorStatus}`;

//         await message.reply(`${tokenMessage}\nLink: ${waitingRoomLink}`);
//       } else {
//         await message.reply(` Sorry, can't fetch the token for Dr. ${doctor.name}`);
//       }
//     } else {
//       await message.reply(`Invalid doctor number.`);
//     }
//   }
// });

// // Start the WhatsApp client
// client.initialize();

// // Set up Express server to render some web content
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to the WhatsApp Bot Service!</h1>");
// });

// app.get("/doctors", async (req, res) => {
//   const doctors = await fetchDoctors();
//   if (doctors.length > 0) {
//     let doctorList = "<h2>Available Doctors:</h2><ul>";
//     doctors.forEach((doctor, index) => {
//       doctorList += `<li>${index + 1}. ${doctor.name} - ${doctor.hospital}</li>`;
//     });
//     doctorList += "</ul>";
//     res.send(doctorList);
//   } else {
//     res.send("<h2>No doctors available at the moment.</h2>");
//   }
// });

// // Start the Express server on port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios");
const express = require("express");
const app = express();

// WhatsApp ക്ലയന്റ് ആരംഭിക്കുക
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

// WhatsApp പ്രാമാണികതയ്ക്കായി QR കോഡ് ജനറേറ്റ് ചെയ്യുക
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// ബോട്ട് ത preparedness പ്രയോജനപ്പെടുമ്പോൾ
client.on("ready", () => {
  console.log("WhatsApp Bot is ready!");
});

// API ൽ നിന്ന് ഡോക്ടർമാരെ ലഭിക്കാൻ ഫംഗ്ഷൻ
async function fetchDoctors() {
  try {
    const response = await axios.get(
      "https://www.api.vyzo.in/api/customer/doctor"
    );
    return response.data.data; // ഡോക്ടർമാരുടെ പട്ടിക തിരികെ നൽകുക
  } catch (error) {
    console.error("ഡോക്ടർമാരെ ലഭിക്കാൻ പിശക്:", error);
    return [];
  }
}

// ഡോക്ടറിന്റെ നിലവിലെ ടോക്കൻ ലഭിക്കാൻ ഫംഗ്ഷൻ
async function fetchDoctorStatus(doctorId) {
  try {
    const response = await axios.get(
      `https://www.api.vyzo.in/api/customer/liveStatus/${doctorId}`
    );
    return response.data.data; // നിങ്ങളുടെ API ഉത്തരം അടിസ്ഥാനമാക്കി ഇത് ക്രമീകരിക്കുക
  } catch (error) {
    console.error("ഡോക്ടർ സ്ഥിതി നേടുന്നതിനിടെ പിശക്:", error);
    return null;
  }
}

// WhatsApp ലെ സന്ദേശങ്ങൾക്ക് കേൾക്കുക
client.on("message", async (message) => {
  const content = message.body.toLowerCase();

  // ടോക്കൻ സ്ഥിതിക്ക് സ്ഥിരീകരണം കൈകാര്യം ചെയ്യുക
  if (content === "yes") {
    const doctors = await fetchDoctors();

    if (doctors.length > 0) {
      let doctorList = "ലഭ്യമായ ഡോക്ടർമാർ:\n";
      doctors.forEach((doctor, index) => {
        doctorList += `${index + 1}. ${doctor.name} - ${doctor.hospital}\n`;
      });
      doctorList += "ദയവായി നിങ്ങൾ തിരഞ്ഞെടുക്കാൻ ആഗ്രഹിക്കുന്ന ഡോക്ടറിന്റെ നമ്പർ നൽകുക.";

      // ഡോക്ടർ പട്ടിക സന്ദേശം അയയ്ക്കുക
      await client.sendMessage(message.from, doctorList);
    } else {
      await client.sendMessage(message.from, "നിലവിൽ ഒരു ഡോക്ടറും ലഭ്യമല്ല.");
    }
    return; // കൂടുതൽ പ്രോസസ്സിംഗ് തടയുക
  }

  // ഡോക്ടർ തിരഞ്ഞെടുക്കുന്നതിനുള്ള നമ്പർ
  if (!isNaN(content)) {
    const serialNumber = parseInt(content);
    const doctors = await fetchDoctors(); // പുതിയ വിവരങ്ങൾ ലഭിക്കാൻ വീണ്ടും ഡോക്ടർമാരെ ലഭിക്കുക

    if (serialNumber > 0 && serialNumber <= doctors.length) {
      const doctor = doctors[serialNumber - 1];
      await client.sendMessage(
        message.from,
        `നിങ്ങൾ ${doctor.hospital} ആശുപത്രിയിലെ Dr. ${doctor.name} നെ തെരഞ്ഞെടുത്തു. നിലവിലെ ടോക്കൻ പരിശോധിക്കുന്നു...`
      );

      const doctorStatus = await fetchDoctorStatus(doctor._id);

      if (doctorStatus) {
        const waitingRoomLink = `https://vyzo-waitingroom.netlify.app/details?id=${doctor._id}`;
        const tokenMessage = doctorStatus.currentToken
          ? `നിലവിലെ ടോക്കൺ നമ്പർ: ${doctorStatus.currentToken}`
          : `നിലവിലെ സ്ഥിതി: ${doctorStatus.doctorStatus}`;

        await client.sendMessage(message.from, `${tokenMessage}\nLink: ${waitingRoomLink}`);
      } else {
        await client.sendMessage(message.from, `Dr. ${doctor.name} യുടെ ടോക്കൻ ലഭിക്കാൻ കഴിയുന്നില്ല.`);
      }
    } else {
      await client.sendMessage(message.from, "അഭ്യസ്തൻ നമ്പർ അസാധുവാണ്.");
    }
  }

  // മറ്റ് സന്ദേശങ്ങൾക്ക് സ്വാഗതം സന്ദേശം അയയ്ക്കുക
  else {
    await client.sendMessage(message.from, `VYZO-യിലേക്ക് സ്വാഗതം🙏...`);
    await client.sendMessage(message.from, `താങ്കൾക്ക് ടോക്കൺ സംബദ്ധിച് അറിയണമെങ്കിൽ "yes" എന്ന് ടൈപ്പ് ചെയ്യുക.`);
  }
});

// WhatsApp ക്ലയന്റ് ആരംഭിക്കുക
client.initialize();

// ചില വെബ് ഉള്ളടക്കം പ്രദർശിപ്പിക്കാൻ എക്സ്പ്രസ്സ് സെർവർ ക്രമീകരിക്കുക
app.get("/", (req, res) => {
  res.send("<h1>WhatsApp ബോട്ട് സേവനത്തിലേക്ക് സ്വാഗതം!</h1>");
});

app.get("/doctors", async (req, res) => {
  const doctors = await fetchDoctors();
  if (doctors.length > 0) {
    let doctorList = "<h2>ലഭ്യമായ ഡോക്ടർമാർ:</h2><ul>";
    doctors.forEach((doctor, index) => {
      doctorList += `<li>${index + 1}. ${doctor.name} - ${doctor.hospital}</li>`;
    });
    doctorList += "</ul>";
    res.send(doctorList);
  } else {
    res.send("<h2>നിലവിൽ ഒരു ഡോക്ടറും ലഭ്യമല്ല.</h2>");
  }
});

// പോർട്ടിൽ 3000 എക്സ്പ്രസ് സെർവർ ആരംഭിക്കുക
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

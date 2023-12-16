const efetch = require("./fetch");
module.exports = async function register(id, headers) {
  const commands = 
    {
      name: "generate",
      type: 1,
      description: "Generate a random pass, min of 8 and max of 10",
      options: [
        {
          name: "length",
          description: "Password length",
          type: 4,
          required: true,
        },
      ],
    }


  const url = `https://discord.com/api/v10/applications/${id}/commands`;

  const e = await efetch(url, headers, "POST", commands);
  console.log(e);
};

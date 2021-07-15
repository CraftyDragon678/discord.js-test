import {
  Client,
  Message,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} from "discord.js";
import getMaskedCanvasImage from "./canvasMask";
import config from "./config";

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.on("message", async (msg) => {
  if (msg.content === "msg") {
    // msg.reply({
    //   embeds: [
    //     {
    //       title: "test",
    //     },
    //     {
    //       title: "test2",
    //     },
    //   ],
    // });
    const m = await msg.reply({
      content: "hi",
      components: [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomID("1")
            .addOptions([
              { label: "크레곤", value: "b", default: true },
              { label: "난 죽지 않아", value: "d", default: true },
              { label: "3", value: "e" },
              { label: "4", value: "c" },
              { label: "5", value: "s" },
            ])
            .setMaxValues(2)
            .setMinValues(2)
            .setPlaceholder("능력 선택")
          // new MessageButton()
          //   .setLabel("ete")
          //   .setCustomID("342")
          //   .setStyle("PRIMARY")
        ),
      ],
    });
    const collected = await m
      .awaitMessageComponentInteraction({
        filter: (interaction) => interaction.user.id === msg.author.id,
        time: 60 * 1000,
      })
      .catch(() => null);

    if (!collected) m.reply("canceled");
    else {
      // await collected.deferUpdate().then(console.log).catch(console.error);
      await collected.update({
        content: "retry",

        components: [
          new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomID("1")
              .addOptions([
                { label: "크레곤", value: "b" },
                { label: "난 죽지 않아", value: "d" },
                { label: "3", value: "e", default: true },
                { label: "4", value: "c", default: true },
                { label: "5", value: "s" },
              ])
              .setMaxValues(2)
              .setMinValues(2)
              .setPlaceholder("능력 선택")
          ),
        ],
      });
    }
  } else if (msg.content === "canvas") {
    const avatarUrl = msg.author.avatarURL({ format: "png" });
    if (!avatarUrl) {
      msg.reply("avatar url is not found");
      return;
    }
    msg.reply({ files: [await getMaskedCanvasImage(avatarUrl)] });
  }
});

client.on("ready", () => console.log("test"));

client.on("interaction", async (interaction) => {
  if (!interaction.isMessageComponent()) return;
  const reference = await (interaction.message as Message).fetchReference();
  if (reference.author.id !== interaction.user.id) {
    interaction.reply({ content: "다른 사람의 것", ephemeral: true });
  } else {
  }
});

client.login(config.token);

export default client;

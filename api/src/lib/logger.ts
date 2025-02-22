import Webhook from "@lacerity/webhook";

const wh = new Webhook("discord", "https://discord.com/api/webhooks/1342797872588128288/pQ4ymUGAYDXOA6tcgugIhE8gyr2fu3YdN0UGisxIP3-lTAEqDM-psJrB6JztPOrImD16");

const logger = (e: unknown) => {
    wh.sendError(e);
    console.error(e);
}

export default logger;
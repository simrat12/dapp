import html from "./index.html";
import css from "./index.css";

import Pages from "@pojagi/hoquet/lib/pages/pages";
import Route from "@pojagi/hoquet/lib/route/route";

import "../proposals/draft";
import ProposalsDraft from "../proposals/draft";

import "../proposals/preview";
import ProposalsDraftPreview from "../proposals/preview";

import "../proposals/listing";
import List from "../proposals/listing";

import "../proposals/detail";
import Detail from "../proposals/detail";

import * as utils from "../utils";
import { ImbueRequest } from "../dapp";
import * as config from "../config";
import {getPage} from "../utils";
import Dashboard from "../dashboard";


const template = document.createElement("template");
template.innerHTML = `
<style>${css}</style>
${html}
`;


const CONTENT = Symbol();


export default class Proposals extends HTMLElement {
    [CONTENT]: DocumentFragment;
    $pages: Pages;

    constructor() {
        super();
        this.attachShadow({mode:"open"});

        this[CONTENT] =
            template.content.cloneNode(true) as
                DocumentFragment;

        this.$pages =
            this[CONTENT].getElementById("pages") as
                Pages;
    }

    connectedCallback() {
        this.shadowRoot?.appendChild(this[CONTENT]);
    }

    async route(path: string | null, request: ImbueRequest) {
        if (!path) {
            this.$pages.select("listing");
            (this.$pages.selected as List).init();
            return;
        }

        const route = new Route("/:page", path);
        const userProject = await request.userProject

        switch (route.data?.page) {
            case "draft":
                if (userProject?.chain_project_id) {
                    utils.redirect(`${config.grantProposalsURL}/detail/${userProject.id}`);
                }

                await getPage<ProposalsDraft>(this.$pages, "editor").init(request);
                this.$pages.select("editor");
                break;
            case "preview":
                if (userProject?.chain_project_id) {
                    utils.redirect(`${config.grantProposalsURL}/detail/${userProject.id}`);
                }

                await getPage<ProposalsDraftPreview>(this.$pages, "preview").init(request);
                this.$pages.select("preview");
                break;
            case "detail":
                await getPage<Detail>(this.$pages, "detail").init(request);
                this.$pages.select("detail");
                break;
            default:
                this.dispatchEvent(utils.badRouteEvent("not-found"));
        }
    }
}

window.customElements.define("imbu-proposals", Proposals);

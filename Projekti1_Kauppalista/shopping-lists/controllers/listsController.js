import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const viewMainpage = async (request) => {
    const mainpagedata = {
        title: "Shared shopping lists",
        numoflists: await listService.countNumberofShoppinglists(),
        numofitems: await listService.countNumberofItemsOnlist(),
      };
    return new Response(await renderFile("mainpage.eta", mainpagedata), responseDetails);
};

const viewActiveShoppinglists = async (request) => {
    const data = {
        activelists: await listService.getActiveShoppinglists(),
    };
    return new Response(await renderFile("shoppinglistspage.eta", data), responseDetails);
};

const addShoppinglist = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await listService.create(name);
    return requestUtils.redirectTo("/lists");
};

const addItemtoShoppinglist = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
    const id = urlParts[2];

    await listService.insertItem(name, id)
    return requestUtils.redirectTo(`/lists/${id}`);

};

const viewIndividualList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
        listitems : await listService.getListitems(urlParts[2]),
        listtitle : await listService.findById(urlParts[2])
    };

    return new Response(await renderFile("pageoflist.eta", data), responseDetails);
};

const setDeactivated = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const id = urlParts[2];
    await listService.deactivateShoppinglist(id);
    return requestUtils.redirectTo("/lists")
};

const markItemCollected = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listid = urlParts[2];
    const itemid = urlParts[4];
    await listService.markCollectedtrue(itemid, listid);
    return requestUtils.redirectTo(`/lists/${listid}`);
};

export {viewActiveShoppinglists, addShoppinglist, viewIndividualList, viewMainpage, setDeactivated, addItemtoShoppinglist, markItemCollected};
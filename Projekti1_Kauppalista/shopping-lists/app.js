import { serve } from "https://deno.land/std@0.160.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listsController from "./controllers/listsController.js";
import * as  requestUtils from "./utils/requestUtils.js";

configure({
    views: `${Deno.cwd()}/views/`,
  });

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
        return await listsController.viewMainpage(request);
    } else if (request.method === "GET" && url.pathname === "/lists") {
        return await listsController.viewActiveShoppinglists(request);
    } else if (request.method === "POST" && url.pathname === "/lists") {
        return await listsController.addShoppinglist(request);
    } else if (request.method === "GET" && url.pathname.match("/lists/[0-9]+")) {
        return await listsController.viewIndividualList(request);
    } else if (request.method === "POST" && url.pathname.match("/lists/[0-9]+/deactivate")) {
        return await listsController.setDeactivated(request);
    } else if (request.method === "POST" && url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect")) {
        return await listsController.markItemCollected(request);
    } else if (request.method === "POST" && url.pathname.match("/lists/[0-9]+/items")) {
        return await listsController.addItemtoShoppinglist(request);
    } else {
      return new Response("Not found", { status: 404 });
    }
};

serve(handleRequest, { port: 7777 });
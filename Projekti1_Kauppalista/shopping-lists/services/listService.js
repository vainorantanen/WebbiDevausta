import { executeQuery } from "../database/database.js";

const getActiveShoppinglists = async () => {
    let result = await executeQuery("SELECT * FROM shopping_lists WHERE active = true;");
    return result.rows;
};

const create = async (name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", {name: name});
};

const insertItem = async (name, shopping_list_id) => {
    await executeQuery("INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($name, $shopping_list_id);", 
    {name: name, shopping_list_id: shopping_list_id});
};

const getListitems = async (id) => {
    let result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id = $id ORDER BY collected, name ASC;", {id : id});
    if (result.rows && result.rows.length > 0) {
        return result.rows;
      } else {
        return false;
      }
    
      //return { id: 0, name: "Unknown" };
};

const deactivateShoppinglist = async (id) => {
    await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $id;", {id: id});
};

const findById = async (id) => {
    let result = await executeQuery("SELECT * FROM shopping_lists WHERE id = $id;", {
      id: id,
    });
  
    if (result.rows && result.rows.length > 0) {
      return result.rows[0];
    }
  
    return { id: 0, name: "Unknown" };
  };

  const markCollectedtrue = async (id, shopping_list_id) => {
    await executeQuery("UPDATE shopping_list_items SET collected = true WHERE id = $id AND shopping_list_id = $shopping_list_id;", {
        id: id, shopping_list_id: shopping_list_id
    });
  };

  const countNumberofShoppinglists = async () => {
    let result = await executeQuery("SELECT COUNT(*) AS n FROM shopping_lists");
    if (result.rows && result.rows.length > 0) {
        return result.rows[0].n;
      } else {
        return false;
      }
  };

  const countNumberofItemsOnlist = async () => {
    let result = await executeQuery("SELECT COUNT(*) AS n FROM shopping_list_items");
    if (result.rows && result.rows.length > 0) {
        return result.rows[0].n;
      } else {
        return false;
      }
  };

export {getActiveShoppinglists, create, getListitems, 
    deactivateShoppinglist, findById, insertItem,
     markCollectedtrue, countNumberofItemsOnlist, countNumberofShoppinglists};
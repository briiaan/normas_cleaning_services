import { JSONToArrayWithoutKey } from "./functions";
import services from "../data/services.json";
const one = "services";
const two = "images"

const Main = () => {
    console.log(JSONToArrayWithoutKey(services, one))
    console.log(JSONToArrayWithoutKey(services, two))
}

Main();
// Existing XML service
class XMLService {
    getUserData() {
        return "<user><name>John Doe</name></user>"
    }
}

// Adapter

class XMLToJSONAdapter {
    constructor(xmlService) {
        this.xmlService = xmlService;
    }

    getUserData() {
        const xml = this.xmlService.getUserData();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml")

        const json = {
            name: xmlDoc.getElementsByTagName("name")[0].textContent,
            age: xmlDoc.getElementsByTagName("age")[0].textContent,
        }
        return json;
    }
}
// This adapter will convert XML -> JSON

// client
function displayUser(user) {
    console.log("Name: " + user.name);
    console.log("Email: " + user.email);
}

const xmlService = new XMLService();
const adapter = new XMLToJSONAdapter(xmlService);

const user = adapter.getUserData();
displayUser(user)





/*

class Adapter {
  constructor(service) {
    this.service = service;
  }

  getData() {
    const xml = this.service.getData();
    return convertXMLToJSON(xml);
  }
}
*/
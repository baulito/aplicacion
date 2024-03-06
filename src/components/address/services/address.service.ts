import { getToken } from "../../../utils/token.util";
/*
TODO: Migrate to service base class
export class AddressService {
    url: string;
    private static instance: AddressService;
    
    static getInstance() {
        if(!AddressService.instance) {
            return new AddressService();
        }
    }
    constructor(){
        this.url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    }
    
    public async save(infoEnvio: {}): Promise<any> {
        const endPoint = this.url + 'envio/new';
        const token = getToken();
        if (token !== '') {
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(infoEnvio)
            };
            const data = await fetch(endPoint, settings);
            return await data.json();
        } else {
            return '{}';
        }
    }
}
*/

export const saveAddress = async (dataEnvio: {}) => {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + 'envio/new';
    const token = getToken();
    if (token !== '') {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(dataEnvio)
        };
        const data = await fetch(endPoint, settings);
        return await data.json();
    } else {
        return '{}';
    }
}
export const updateAddress = async (dataEnvio: {}) => {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + 'envio/update';
    const token = getToken();
    if (token !== '') {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(dataEnvio)
        };
        const data = await fetch(endPoint, settings);
        return await data.json();
    } else {
        return '{}';
    }
}
export const deleteAddress = async (id:number) => {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + 'envio/delete/'+id;
    const token = getToken();
    if (token !== '') {
        const settings = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        const data = await fetch(endPoint, settings);
        return await data.json();
    } else {
        return '{}';
    }
}

export const updateUserMainAddress = async (id: number) => {
    try {
      const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
      const endPoint = url + "envio/changeprincipal/" + id;
      const token = getToken();
      if (token !== "") {
        const settings = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const data = await fetch(endPoint, settings);
        return await data.json();
      } else {
        return "{}";
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
import myaxios from "@/axios";
const axios = new myaxios();



export function addFile(data:any) {
    return axios.post('/platform/docker-compose-file/create?type=peer',data);
}


import { environment } from "src/environments/environment";

export const ENDPOINTS = {
    TODO: environment.apiBaseUrl+'/api/todo/',
    STATUS: environment.apiBaseUrl+'/api/status',
    PRIORITY: environment.apiBaseUrl+'/api/priority',
}
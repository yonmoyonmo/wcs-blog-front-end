export function endpointMania (restOfEndpoint){
    //restOfEndpoint 생김새 "/api/어쩌구 저쩌구"
    const baseEndpoint = "http://localhost:8000";
    return baseEndpoint + restOfEndpoint;
}

export function authEndpoint(restOfEndpoint){
    const baseEndpoint = "http://localhost:7000"
    return baseEndpoint + restOfEndpoint;
}

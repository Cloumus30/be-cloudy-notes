export const paginate = (query:any)=>{
    const perPage = parseInt(query.perPage) ?? 10;
    const page = parseInt(query.page) ?? 1;
    const take = perPage;
    const skip = (perPage * page) - perPage;

    return {
        take,
        skip,
        page,
        perPage,
    }
}

export const exclude = (model:any, keys:string[]) =>{
    for (let key of keys) {
        delete model[key];
    }
    return model;
}
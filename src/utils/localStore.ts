class localStore{

   static set(key:string,data:string){
        sessionStorage.setItem(key,data)
    }

   static get(key:string){
        return sessionStorage.getItem(key)
    }

   static delete(key:string){
      return sessionStorage.removeItem(key)
    }
    static clear(){
        return sessionStorage.clear()
    }
}

export default localStore
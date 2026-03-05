class Node{
    constructor(key,value){
        this.key=key;
        this.value=value;
        this.next=null;
    }
}
class HashMap{
    capacity=16;
    loadFactor=0.75;
    table=new Array(this.capacity);
    size=0;
    hash(key){
        let hashCode=0;
        const primeNumber=31;
        for(let i=0;i<key.length;i++){
            hashCode=(primeNumber*hashCode+key.charCodeAt(i))%this.capacity;
        }
        return hashCode;
    }
    set(key,value){
        
        if(this.size>this.capacity*this.loadFactor){
            let oldEntries=this.entries();
            this.capacity*=2;
            this.table=new Array(this.capacity);
            this.size=0;
            for(let i=0;i<oldEntries.length;i++){
                const entry=oldEntries[i]
                this.set(entry[0],entry[1]);
            }
        }
        const index=this.hash(key);
        if(!this.table[index]){
            this.table[index]=new Node(key,value);
            this.size++;
        }
        else{
            let cur=this.table[index];
            let p=null;
            while(cur!==null && cur.key!==key){
                p=cur;
                cur=cur.next;
            }
            if(cur!==null){
                cur.value=value;
            }
            else{
                p.next=new Node(key,value);
                this.size++;
            }
        }
                
    }   
    get(key){
        const index=this.hash(key);
        if(!this.table[index]){
            return null
        }
        let cur=this.table[index];
        while(cur!==null && cur.key!==key){
            cur=cur.next;
        }
        if(cur===null){
            return null;
        }
        else{
            return cur.value;
        }        
    }
    has(key){
        const index=this.hash(key);
        if(!this.table[index]){
            return false;
        }
        let cur=this.table[index];
        while(cur!==null && cur.key!==key){
            cur=cur.next;
        }
        if(cur===null){
            return false;
        }
        else{
            return true;
        }
    }
    remove(key){
        if(!this.has(key)){
            return false;
        }
        const index=this.hash(key);        
        if(this.table[index].key===key){
            this.table[index]=this.table[index].next;
            this.size--;
            return true;
        }
        let p=this.table[index];
        let cur=p.next;
        while(cur!==null && cur.key!==key){
            cur=cur.next;
            p=p.next;
        }
        p.next=cur.next;
        this.size--;
        return true;
    }
    length(){
        return this.size;
    }
    clear(){
        this.table=new Array(this.capacity);
        this.size=0;
    }
    keys(){
        let keys=[];
        for(let i=0;i<this.table.length;i++){
            if(this.table[i]){
                let cur=this.table[i];
                while(cur!==null){
                    keys.push(cur.key);
                    cur=cur.next;
                }
            }
        }
        return keys;
    }
    values(){
        let values=[];
        for(let i=0;i<this.table.length;i++){
            if(this.table[i]){
                let cur=this.table[i];
                while(cur!==null){
                    values.push(cur.value);
                    cur=cur.next;
                }
            }
        }
        return values;
    }
    entries(){
        let entries=[];
        for(let i=0;i<this.table.length;i++){
            if(this.table[i]){
                let cur=this.table[i];
                while(cur!==null){
                    entries.push([cur.key,cur.value]);
                    cur=cur.next;
                }
            }
        }
        return entries;
    }
}
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import { failedRepo, successGetRepo, successSaveRepo } from '../config/response';

class StorageRepository{
    protected supabase: SupabaseClient;

    constructor(){
        this.supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
    }

    public async createBucket(nameBucket:string){
        try {
            const {data, error} = await this.supabase.storage.createBucket(nameBucket);
            if(error){
                throw new Error(error.message);
            }
            return successSaveRepo(data);
        } catch (error: any) {
            return failedRepo(error.message);
        }
    }

    public async listBucket(){
        try {
            const {data, error} = await this.supabase.storage.listBuckets();
            if(error){
                return failedRepo(error.message);
            }
            
            return successGetRepo(data);
        } catch (error:any) {
            return failedRepo(error.message);
        }
    }

    public async detailBucket(bucketName: string){
        try {
            const {data, error} = await this.supabase.storage.getBucket(bucketName);
            
            if(error){
                return failedRepo(error.message);
            }
            
            return successGetRepo(data);
        } catch (error:any) {
            return failedRepo(error.message);
        }
    }

    public async deleteBucket(){
        try {
            // const data = await this.supabase.storage.deleteBucket()
        } catch (error:any) {
            return failedRepo(error.message);
        }
    }
}

export default StorageRepository;
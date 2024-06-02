import { DataType } from "@/mock/data";
import { create } from "zustand";

const useDataStore = create((set) => ({
    data: [],
    fetch: async () => {
        const { data } = await ((await fetch("/api/data")).json());
        console.log(data);
        set({ data: data })
    },
}));

export default useDataStore;
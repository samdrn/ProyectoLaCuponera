export const getAll = async () => {
    return await getDocs(collection(db, "users")).where("role", "==", "client")
}

export const getById = async (id) => {
    return await getDoc(id)
}
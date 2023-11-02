export const getUsers = (req, res) => {
    console.log("Llegaste a la ruta de usuarios")
    res.status(201).json({
        message: "Se han recibido los datos correctamente"
    });
}
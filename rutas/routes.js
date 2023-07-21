const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const Usuario = require("../modelos/usuarioModel");

// Renderizar login
router.get("/", (req, res) => {
	res.render("login");
});

router.get('/foro', (req, res) => {
    res.render('foro');
});

// Renderizar inicio
router.get("/inicio", (req, res) => {
	// Si el usuario esta autenticado renderizar inicio
	if (req.session.usuario) {
		res.json(req.session.usuario);
	} else {
        // Si el usuario no esta autenticado redirigir a login
		res.redirect("/error");
	}
});

// Renderizar logout
router.get("/logout", (req, res) => {
    // Destruir sesion
	req.session.destroy();
	res.redirect("/");
});

// Ruta post para manejar inicio de sesion
router.post("/login", async (req, res) => {
	// Destructurar req.body y obtener expediente, y password
	const { expediente, password } = req.body;
	try {
		// Buscar que el expediente exista y este activo
        // == SELECT * FROM usuarios WHERE expediente = expediente AND status = 1
		const usuario = await Usuario.findOne({
			where: { expediente, status: 1 },
		});

		// Usuario no encontrado
		if (!usuario) res.redirect("/");

		// Comparar contraseña enviada por usuario con almacenada en la bd
		const contraseñaValida = await bcryptjs.compare(
			password,
			usuario.password
		);

		if (contraseñaValida) {
			// Crear sesion con datos del usuario
			req.session.usuario = usuario;
			res.redirect("/inicio");
		} else {
			// Contraseña incorrecta
			console.log("contraseña incorrecta");
			res.redirect("/");
		}
	} catch (error) {
		// Manejar error al autenticar usuario
		console.error("Error al autenticar usuario:", error.sqlMessage);
		res.redirect("/");
	}
});

// Ruta post para manejar registro de usuario
router.post("/register", async (req, res) => {
	// Destructura el objeto req.body
	const { expediente, nombre, password } = req.body;
	try {
		// Buscar si el expediente existe
		const usuarioExistente = await Usuario.findOne({
			where: {
				expediente: expediente,
			},
			// Traer unicamente el campo expediente
			attributes: ["expediente"],
		});

		// Si el expediente existe redirigir a inicio
		if (usuarioExistente) res.redirect("/inicio");

		// Establecer saltRounds para hash de contraseña
		const saltRounds = 10;
		// Generar password hashed
		const hashedPassword = await bcryptjs.hash(password, saltRounds);

		// Crear nuevo usuario con: expediente, nombre, password (hashed), status en true
		const nuevoUsuario = await Usuario.create({
			expediente,
			nombre,
			password: hashedPassword,
			status: 1,
		})
			// Si el usuario fue creado correctamente
			.then(() => {
				console.log("Usuario Creado");
				res.redirect("/");
			})
			// Si hubo un error al crear el usuario
			.catch((e) => {
				console.log(`Error al crear usuario: ${e}`);
				res.redirect("/");
			});
	} catch (e) {
		// Manejar error al crear usuario
		console.log(`Error al crear usuario: ${e}`);
		res.redirect("/");
	}
});

module.exports = router;

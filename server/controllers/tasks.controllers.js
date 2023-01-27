import { pool } from "../db.js";

export const getTasks = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM tasks ORDER BY createdAt ASC");
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query(`SELECT * FROM tasks WHERE id = ${id} ORDER BY createdAt ASC`);
    try {
        if (result.length === 0) {
            return res.status(404).json({
                message: "No existe una tarea con ese id"
            })
        }
        res.json(result[0])
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const [result] = await pool.query(`INSERT INTO tasks(title, description) VALUES (?, ?)`, [title, description])
        return res.json({
            id: result.insertId,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const result = await pool.query(`UPDATE tasks SET ? WHERE id = ?`, [
            req.body,
            req.params.id
        ]);
        if (result[0].changedRows === 0) {
            res.json({
                message: "nothing was changed"
            })
        }
        else {
            return res.json(result)
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`DELETE FROM tasks WHERE id = ${id}`);

        if (result.affectedRows === 0) {
            return res.sendStatus(404).json({ message: "task not found" })
        }
        else {
            return res.sendStatus(204)
        }

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

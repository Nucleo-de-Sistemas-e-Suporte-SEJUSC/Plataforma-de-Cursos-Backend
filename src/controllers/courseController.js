const { courses } = require('../data/courses.Data');
const { courseVideos } = require('../data/videosData');

// Função para buscar todos os cursos
exports.getAllCourses = async (req, res) => {
  try {
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar se o ID é um número válido
    const courseId = parseInt(id, 10);
    if (isNaN(courseId)) {
      return res
        .status(400)
        .json({ error: 'ID do curso deve ser um número válido.' });
    }

    //  Busca o curso no nosso array de dados locais
    //  Convertemos o id para número para fazer a comparação estrita
    const courseFromData = courses.find(c => c.id === courseId);

    if (!courseFromData) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }

    //  Busca os vídeos correspondentes
    const videosForThisCourse = courseVideos[courseId] || [];

    const course = {
      ...courseFromData,
      videos: videosForThisCourse,
    };

    //  Retorna o objeto completo
    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

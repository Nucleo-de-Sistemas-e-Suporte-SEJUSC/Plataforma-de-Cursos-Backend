
const { courses } = require('../data/coursesData');
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

    //  Busca o curso no nosso array de dados locais
    //  Usamos '==' em vez de '===' porque o id da URL é uma string e no nosso array é um número
    const courseFromData = courses.find(c => c.id == id);

    if (!courseFromData) {
      return res.status(404).json({ message: 'Curso não encontrado.' });
    }

    //  Busca os vídeos correspondentes
    const videosForThisCourse = courseVideos[id] || [];

    //  Junta as informações (criamos uma cópia para não alterar o objeto original)
    const course = {
      ...courseFromData,
      videos: videosForThisCourse
    };

    //  Retorna o objeto completo
    return res.status(200).json(course);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
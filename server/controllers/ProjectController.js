import Project from "../models/projectSchema.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const { projectName } = req.body;

    const doc = await Project.create({
      userId,
      projectName,
    });

    res.status(200).json({ success: true, message: "Project created", doc });
  } catch (error) {
    console.error('Error in createProject:', error);
    res.status(500).json({ success: false, message: `Failed to create project: ${error.message}` });
  }
};

// Fetch all projects for a user
export const fetchProjects = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;

    const projectData = await Project.find({ userId });

    res.status(200).json({ success: true, message: "Projects fetched", data: projectData });
  } catch (error) {
    console.error('Error in fetchProjects:', error);
    res.status(500).json({ success: false, message: `Failed to fetch projects: ${error.message}` });
  }
};

// Fetch a single project by ID
export const fetchProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const projectData = await Project.findOne({ _id: projectId });

    if (!projectData) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: "Project fetched", data: projectData });
  } catch (error) {
    console.error('Error in fetchProject:', error);
    res.status(500).json({ success: false, message: `Failed to fetch project: ${error.message}` });
  }
};

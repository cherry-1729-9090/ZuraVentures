import File from "../models/fileSchema.js";
import Project from "../models/projectSchema.js";

// Upload file
export const createFile = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const { projectId } = req.params;
    const { fileName, fileDescription } = req.body;

    const doc = await File.create({
      userId,
      projectId,
      fileName,
      fileDescription,
    });

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $inc: { fileCount: 1 } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: "File created", doc });
  } catch (error) {
    console.error('Error in createFile:', error);
    res.status(500).json({ success: false, message: `Failed to create file: ${error.message}` });
  }
};

// Fetch files
export const fetchFiles = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const { projectId } = req?.params;

    const files = await File.find({ projectId, userId });

    res.status(200).json({ success: true, message: "Files fetched", data: files });
  } catch (error) {
    console.error('Error in fetchFiles:', error);
    res.status(500).json({ success: false, message: `Failed to fetch files: ${error.message}` });
  }
};

// Fetch single file
export const fetchFile = async (req, res) => {
  try {
    const { projectId, fileId } = req.params;

    const file = await File.findOne({ _id: fileId, projectId });

    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    res.status(200).json({ success: true, message: "File fetched", data: file });
  } catch (error) {
    console.error('Error in fetchFile:', error);
    res.status(500).json({ success: false, message: `Failed to fetch file: ${error.message}` });
  }
};

// Edit file
export const editFile = async (req, res) => {
  try {
    const { projectId, fileId } = req.params;
    const { fileName, fileDescription } = req.body;

    const doc = await File.updateOne(
      { _id: fileId, projectId },
      { $set: { fileName, fileDescription } }
    );

    res.status(200).json({ success: true, message: "File updated", doc });
  } catch (error) {
    console.error('Error in editFile:', error);
    res.status(500).json({ success: false, message: `Failed to update file: ${error.message}` });
  }
};

// Delete file
export const deleteFile = async (req, res) => {
  try {
    const { projectId, fileId } = req.params;

    const deletedFile = await File.findOneAndDelete({ _id: fileId, projectId });

    if (!deletedFile) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    await Project.findByIdAndUpdate(projectId, { $inc: { fileCount: -1 } });

    res.status(200).json({ success: true, message: "File deleted", doc: deletedFile });
  } catch (error) {
    console.error('Error in deleteFile:', error);
    res.status(500).json({ success: false, message: `Failed to delete file: ${error.message}` });
  }
};

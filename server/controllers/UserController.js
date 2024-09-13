import User from '../models/userSchema.js';

export const fetchUser = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const data = await User.findOne({ _id: userId });

    if (!data) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User fetched successfully', data });
  } catch (error) {
    console.error('Error in fetchUser controller:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const { userName } = req.body;

    const result = await User.updateOne(
      { _id: userId },
      { $set: { userName } }
    );

    if (result.nModified === 0) {
      return res.status(400).json({ success: false, message: 'User update failed' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error in updateUser controller:', error);
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
};

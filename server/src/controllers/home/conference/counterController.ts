import { Request, Response } from 'express';
import { CounterModel } from '../../../models/home/CounterModule';

// Fetch Counter Statistics
export const getCounterStats = async (req: Request, res: Response) => {
  try {
    let stats = await CounterModel.findOne();
    
    // Fallback if DB is completely empty
    if (!stats) {
      stats = new CounterModel({
        couples: 6000,
        courses: 15,
        speakers: 45,
        lectures: 90,
      });
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// Upsert Counter Statistics (Update or Insert)
export const updateCounterStats = async (req: Request, res: Response) => {
  try {
    const { couples, courses, speakers, lectures } = req.body;

    const stats = await CounterModel.findOneAndUpdate(
      {}, // Empty filter targets the single counter configuration
      { couples, courses, speakers, lectures },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Counter statistics updated successfully',
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update stats', error });
  }
};
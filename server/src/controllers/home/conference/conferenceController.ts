import { Request, Response } from 'express';
import { Conference } from '../../../models/home/Conference';

// GET all conferences
export const getConferences = async (req: Request, res: Response) => {
  try {
    const conferences = await Conference.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: conferences });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// CREATE a conference
export const createConference = async (req: Request, res: Response) => {
  try {
    const newConference = await Conference.create(req.body);
    res.status(201).json({ success: true, data: newConference });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// UPDATE a conference
export const updateConference = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Conference.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Conference not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// DELETE a conference
export const deleteConference = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Conference.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Conference not found' });
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
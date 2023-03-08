import express  from "express";
import * as dotenv from 'dotenv';

import { postsCollection, storage } from '../firebase/connect.js';
import { addDoc, getDocs } from "@firebase/firestore";
import {
    ref,
    uploadString,
    getDownloadURL,
} from "@firebase/storage";

dotenv.config();

const router = express.Router();

// GET ALL POSTS
router.route('/').get(async (req, res) => {
    try {
        const snapshot = await getDocs(postsCollection);
        const posts = [];
        snapshot.docs.map((e) => {
          posts.push({ id: e.id, ...e.data() });
        });

        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error }) 
    }
})

// CREATE A POST
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;

        const storageRef = ref(storage, `posts/${name}`);
        const snapshot = await uploadString(storageRef, photo, 'data_url');
        const url = await getDownloadURL(snapshot.ref);

        const postData = {
            name,
            prompt,
            photo: url
        };

        await addDoc(postsCollection, postData);

        res.status(201).json({ success: true, data: { name } });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    } 
})

export default router;

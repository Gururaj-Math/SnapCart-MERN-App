import { useState, useEffect } from 'react';
import { Card, Divider, Avatar, Tag, Button, Input, message, Popconfirm } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import API_BASE_URL from '../constant';
import { useSelector } from 'react-redux';
import FollowedUserDetails from './FollowedUserDetails';
import { Note } from '../types';

const { Meta } = Card;

const NotesBoard = () => {
   const [notes, setNotes] = useState<Note[]>([]);
   const [newNoteDescription, setNewNoteDescription] = useState('');
   const { currentUser } = useSelector((state: any) => state.user);

   const fetchUserDetails = async (userId: string) => {
      try {
         const res = await axios.get(`${API_BASE_URL}users/${userId}`);
         return res.data.data;
      } catch (error) {
         console.error('Error fetching user details:', error);
         return null;
      }
   };

   const createNote = async () => {
      try {
         await axios.post(`${API_BASE_URL}notes/`, {
            userId: currentUser._id,
            description: newNoteDescription,
         });
         fetchNotes();
         setNewNoteDescription('');
         message.success('Note created successfully');
      } catch (error) {
         console.error('Error creating note:', error);
         message.error('Failed to create note');
      }
   };

   const deleteNote = async (noteId: string) => {
      try {
         await axios.delete(`${API_BASE_URL}notes/${noteId}`);
         fetchNotes();
         message.success('Note deleted successfully');
      } catch (error) {
         console.error('Error deleting note:', error);
         message.error('Failed to delete note');
      }
   };

   const fetchNotes = async () => {
      try {
         const response = await axios.get(`${API_BASE_URL}notes`);
         const notesWithUserDetails = await Promise.all(
            response.data.notes.map(async (note: any) => {
               const userDetails = await fetchUserDetails(note.userOwner);
               return { ...note, userDetails };
            })
         );
         setNotes(notesWithUserDetails);
      } catch (error) {
         console.error('Error fetching notes:', error);
      }
   };

   useEffect(() => {
      fetchNotes();
   }, []);

   return (
      <div className="min-h-90vh overflow-auto">
         <Card
            style={{
               overflow: 'auto',
               height: '100vh',
               right: 0,
               top: 0,
               bottom: 0,
               padding: 10,
               width: 400,
            }}
            className='lg:fixed'
         >
            <Divider orientation="left">Notes</Divider>
            <div className="flex flex-col gap-2 items-center max-h-[70vw] overflow-auto">
               <Card style={{ width: 300 }} actions={[<Button onClick={createNote}>Save</Button>]}>
                  <Meta avatar={<Avatar src={currentUser.avatar} />} title={'Create Note'} description={''} />
                  <div className="py-4">
                     <Input
                        placeholder="Description"
                        className="p-2"
                        value={newNoteDescription}
                        onChange={(e) => setNewNoteDescription(e.target.value)}
                     />
                  </div>
               </Card>
               {notes.map((note: any) => (
                  <Card key={note._id} style={{ width: 300 }}>
                     <Meta
                        avatar={<Avatar src={note.userDetails.avatar} />}
                        title={note.userDetails.username}
                        description={note.description}
                     />
                     <div className="p-2 flex- justify-between">
                        <Tag icon={<ClockCircleOutlined />} color="geekblue">
                           {moment(note.createdAt).format('MMMM Do, h:mm a')}
                        </Tag>

                        {note.userOwner === currentUser._id && (
                           <Popconfirm
                              title="Are you sure you want to delete this note?"
                              onConfirm={() => deleteNote(note._id)}
                              okText="Yes"
                              cancelText="No"
                           >
                              <Button type="text" danger icon={<DeleteOutlined />} />
                           </Popconfirm>
                        )}
                     </div>
                  </Card>
               ))}
            </div>
            <Divider orientation="left">Following Users</Divider>
            <div className="flex flex-col gap-2 items-center max-h-[70vw] overflow-auto">
               {currentUser.following &&
                  currentUser.following.map((userId: string) => (
                     <div key={userId}>
                        <FollowedUserDetails userId={userId} />
                     </div>
                  ))}
            </div>
         </Card>
      </div>
   );
};

export default NotesBoard;

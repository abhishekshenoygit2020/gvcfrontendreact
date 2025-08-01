import React, { useState, useEffect } from "react";
import {
    Button, Dialog, DialogContent, DialogTitle, FormControl,
    TextField, Grid, DialogActions, Typography, Snackbar, Alert,
    IconButton, Box
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import axios from "../../../api/axios";

const url = "https://sl.synchash.in";
// const url = "http://localhost:3006";

const AdminNotesFileUpload = ({ open, setOpen, isAddButton, rowData, setRefreshData }) => {
    const [notes, setNotes] = useState('');
    const [files, setFiles] = useState([]);
    const [base64Files, setBase64Files] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [dataList, setDataList] = useState([]);

    const [editRow, setEditRow] = useState(null);
    const [editNotes, setEditNotes] = useState('');
    const [editFiles, setEditFiles] = useState([]);
    const [editBase64, setEditBase64] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]);

    const [viewRow, setViewRow] = useState(null);

    const columns = [
        { field: 'slno', headerName: 'ID', width: 80 },
        { field: 'notes', headerName: 'Notes', width: 250 },
        {
            field: 'files',
            headerName: 'Attached File',
            width: 300,
            renderCell: (params) => {
                const raw = params.value;
                let fileList = [];
                try {
                    fileList = JSON.parse(raw);
                } catch { }

                return fileList.length > 0 ? fileList.map((file, idx) => {
                    const fileName = file.split('/').pop().toLowerCase();
                    const isImage = /\.(png|jpe?g|gif|webp)$/i.test(fileName);
                    const isPdf = /\.pdf$/i.test(fileName);
                    return (
                        <a
                            key={idx}
                            href={url + file}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', marginRight: 8 }}
                        >
                            {isImage ? (
                                <img src={url + file} alt="Attached" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                            ) : isPdf ? (
                                <PictureAsPdfIcon color="error" />
                            ) : (
                                <InsertDriveFileIcon />
                            )}
                        </a>
                    );
                }) : 'No File';
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 140,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleViewRow(params.row)}><VisibilityIcon /></IconButton>
                    <IconButton onClick={() => handleEditRow(params.row)}><EditIcon color="primary" /></IconButton>
                    <IconButton onClick={() => handleDeleteRow(params.row)}><DeleteIcon color="error" /></IconButton>
                </>
            )
        }
    ];

    useEffect(() => {
        if (rowData) {
            setDataList([]);
            setNotes('');
            setFiles([]);
            setBase64Files([]);
            setAlertOpen(false);
            loadData();
        }
    }, [open]);

    const convertToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(err);
        reader.readAsDataURL(file);
    });

    const handleFileChange = async (e) => {
        const selected = Array.from(e.target.files);
        setFiles(selected);
        const encoded = await Promise.all(selected.map(convertToBase64));
        setBase64Files(encoded);
    };

    const handleSubmit = async () => {
        try {
            const payload = { warrantyId: rowData?.id, notes, base64Files, action: "add", id: "" };
            await axios.post('/dealership/saveUserNote', payload);
            setMessage('Note saved'); setSeverity('success'); setAlertOpen(true);
            setTimeout(() => { setOpen(false); setRefreshData?.(prev => !prev); }, 1000);
        } catch {
            setMessage('Save failed'); setSeverity('error'); setAlertOpen(true);
        }
    };

    const loadData = async () => {
        setDataList([]);
        try {
            const response = await axios.post("/dealership/getUserNote", { warrantyId: rowData?.id });

            const data = response?.data;

            // Check if response has expected structure
            if (data && data.success === 1 && Array.isArray(data.data)) {
                const cleaned = data.data.map((item, index) => ({
                    ...item,
                    slno: index + 1
                }));

                setDataList(cleaned);
            } else {

                setDataList([]);
                console.warn("Invalid response structure or no data:", data);
            }
        } catch (error) {
            console.error("loadData failed:", error);
            // setDataList([]);
            // setMessage("No Data Found");
            // setSeverity("error");
            // setAlertOpen(true);
        }
    };

    const handleDeleteRow = async (row) => {
        await axios.post('/dealership/deleteUserNote', { id: row.id });
        loadData();
        setMessage('Deleted'); setSeverity('success'); setAlertOpen(true);
        setRefreshData?.(prev => !prev);
    };

    const handleEditRow = (row) => {
        setEditRow(row);
        setEditNotes(row.notes);
        try {
            const existing = JSON.parse(row.files || '[]');
            setExistingFiles(existing);
        } catch {
            setExistingFiles([]);
        }
        setEditFiles([]);
        setEditBase64([]);
    };

    const handleEditFileChange = async (e) => {
        const newFiles = Array.from(e.target.files);
        setEditFiles(newFiles);
        const encoded = await Promise.all(newFiles.map(convertToBase64));
        setEditBase64(encoded);
    };

    const handleEditSubmit = async () => {
        const payload = {
            id: editRow.id,
            notes: editNotes,
            base64Files: editBase64,
            existingFiles,
            action: "edit",
            warrantyId: ""
        };
        await axios.post('/dealership/saveUserNote', payload);
        setEditRow(null);
        loadData();
        setMessage('Note updated'); setSeverity('success'); setAlertOpen(true);
    };

    const handleViewRow = (row) => setViewRow(row);
    const handleCloseSnackbar = (_, reason) => reason !== 'clickaway' && setAlertOpen(false);

    return (
        <Dialog fullWidth maxWidth="md" open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{isAddButton ? 'Add Note' : 'View Notes'}</DialogTitle>
            {isAddButton ? (
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Notes" multiline minRows={3} fullWidth
                                value={notes} onChange={(e) => setNotes(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                        </Grid>
                    </Grid>
                </DialogContent>
            ) : (
                <DialogContent>
                    <Box sx={{ height: 300 }}>
                        <DataGrid
                            rows={dataList}
                            columns={columns}
                            pageSize={5}
                            getRowId={(row) => row.id}
                        />
                    </Box>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    setDataList([]); // Clear the list on cancel
                }}>Cancel</Button>
                {isAddButton && <Button onClick={handleSubmit} variant="contained">Save</Button>}
            </DialogActions>

            {editRow && (
                <Dialog open={true} onClose={() => setEditRow(null)} fullWidth maxWidth="sm">
                    <DialogTitle>Edit Note</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Notes" multiline minRows={4} fullWidth sx={{ mb: 2 }}
                            value={editNotes} onChange={(e) => setEditNotes(e.target.value)}
                        />
                        <Typography variant="subtitle2">Existing Files</Typography>
                        <Grid container spacing={2}>
                            {existingFiles.map((file, index) => {
                                const fileName = file.split('/').pop();
                                const isImage = /\.(png|jpe?g|gif|webp)$/i.test(fileName);
                                const isPdf = /\.pdf$/i.test(fileName);
                                return (
                                    <Grid item xs={6} md={4} key={index}>
                                        <Box position="relative" border="1px solid #ccc" borderRadius={1} p={1}>
                                            <Tooltip title="Remove File">
                                                <IconButton size="small" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => {
                                                    const updated = [...existingFiles];
                                                    updated.splice(index, 1);
                                                    setExistingFiles(updated);
                                                }}>

                                                    <DeleteIcon fontSize="small" color="error" />


                                                </IconButton>
                                            </Tooltip>
                                            <a href={url + file} target="_blank" rel="noopener noreferrer">
                                                {isImage ? (
                                                    <img src={url + file} alt="attachment" style={{ width: '100%' }} />
                                                ) : isPdf ? (
                                                    <PictureAsPdfIcon color="error" />
                                                ) : (
                                                    <InsertDriveFileIcon />
                                                )}
                                            </a>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleEditFileChange} style={{ marginTop: 12 }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditRow(null)} color="secondary">Cancel</Button>
                        <Button onClick={handleEditSubmit} color="primary" variant="contained">Update</Button>
                    </DialogActions>
                </Dialog>
            )}

            {viewRow && (
                <Dialog open={true} onClose={() => setViewRow(null)} maxWidth="sm" fullWidth>
                    <DialogTitle>View Note</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle2" gutterBottom>Notes</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{viewRow.notes}</Typography>

                        <Typography variant="subtitle2" gutterBottom>Attached Files</Typography>
                        <Grid container spacing={2}>
                            {(() => {
                                let fileList = [];
                                try {
                                    fileList = JSON.parse(viewRow.files || '[]');
                                } catch { }
                                return fileList.length === 0 ? (
                                    <Typography>No files attached</Typography>
                                ) : (
                                    fileList.map((file, index) => {
                                        const fileName = file.split('/').pop().toLowerCase();
                                        const isImage = /\.(png|jpe?g|gif|webp)$/i.test(fileName);
                                        const isPdf = /\.pdf$/i.test(fileName);
                                        return (
                                            <Grid item xs={6} md={4} key={index}>
                                                <Box border="1px solid #ccc" borderRadius={1} p={1}>
                                                    <a href={url + file} target="_blank" rel="noopener noreferrer">
                                                        {isImage ? (
                                                            <img src={url + file} alt="attachment" style={{ width: '100%' }} />
                                                        ) : isPdf ? (
                                                            <PictureAsPdfIcon color="error" fontSize="large" />
                                                        ) : (
                                                            <InsertDriveFileIcon fontSize="large" />
                                                        )}
                                                        <Typography variant="caption" display="block">{fileName}</Typography>
                                                    </a>
                                                </Box>
                                            </Grid>
                                        );
                                    })
                                );
                            })()}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setViewRow(null)}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}

            <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </Dialog>
    );
};

export default AdminNotesFileUpload;

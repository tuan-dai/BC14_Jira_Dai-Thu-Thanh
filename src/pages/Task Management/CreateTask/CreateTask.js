import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from "@tinymce/tinymce-react";
import { Select, Button, Slider } from 'antd';
import { getAllProject } from '../../../redux/actions/getAllProject';
import { getUserProjectId } from '../../../redux/actions/User';
import { getAllPriority, getAllStatus, getAllTaskType } from '../../../redux/actions/Task';
import { useFormik } from 'formik';
import *as Yup from 'yup';
import { createTask } from '../../../redux/actions/createTask';


export default function CreateTask() {
    const handleEditorChange = (e) => setFieldValue('description', e.target.getContent());
    const { _status, priority, taskType } = useSelector(state => state.Task_Reducer)

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProject())
        dispatch(getAllStatus())
        dispatch(getAllPriority())
        dispatch(getAllTaskType())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    //GET ALL PROJECTS
    const projects = useSelector(state => state.getAllProject_Reducer.data)
    const projectTable = () => {
        return projects?.map(project => {
            return <option key={project?.id} value={project.id}>{project.projectName}</option>
        })
    }

    //GET USER BY PROJECT ID
    const { userProjectId } = useSelector(state => state.getListUser_Reducer)
    console.log(userProjectId)

    //GET ALL STATUS
    const statusTable = () => {
        return _status?.map(item => {
            return <option key={item.statusId} value={item.statusId}>{item.statusName}</option>
        })
    }

    //GET ALL PRIORITY
    const priorityTable = () => {
        return priority?.map(item => {
            return <option key={item.priorityId} value={item.priorityId}>{item.priority}</option>
        })
    }

    //GET ALL TASKTYPE
    const taskTypeTable = () => {
        return taskType?.map(item => {
            return <option key={item.id} value={item.id}>{item.taskType}</option>
        })
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            listUserAsign: [],
            taskName: "",
            description: "",
            status: _status?.[0].statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: projects?.[0].id,
            typeId: taskType?.[0].id,
            priorityId: priority?.[0].priorityId
        },
        onSubmit: values => dispatch(createTask(values)),
        validationSchema: Yup.object({
            taskName: Yup.string().required('Task name is required')
        })
    })
    const { handleSubmit, handleChange, setFieldValue, errors, touched } = formik






    return (
        <div className="w-full max-h-screen p-5">
            <p className="text-3xl font-medium">Create Task</p>
            <form onSubmitCapture={handleSubmit}>
                <div className="form-group">
                    <label>Project</label>
                    <select className="form-control" name='projectId' onChange={e => {
                        dispatch(getUserProjectId(e.target.value))
                        setFieldValue('projectId', e.target.value)
                    }} >
                        {projectTable()}
                    </select>
                </div>

                <div className="form-group">
                    <label>Task Name</label>
                    <input className="form-control" name="taskName" onChange={handleChange} />
                    {errors.taskName && touched.taskName && <p className="text-red-500">{errors.taskName}</p>}
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select className="form-control" name="status" onChange={handleChange}>
                        {statusTable()}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="form-group">
                        <label>Priority</label>
                        <select className="form-control" name="priorityId" onChange={handleChange} >
                            {priorityTable()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Task Type</label>
                        <select className="form-control" name="typeId" onChange={handleChange} >
                            {taskTypeTable()}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="form-group">
                        <label>Assignees</label><br />
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            optionFilterProp="label"
                            options={
                                userProjectId
                                    ? userProjectId?.map(user => {
                                        return ({ label: user.name, value: user.userId })
                                    })
                                    : projects?.[0].members.map(user => { return ({ label: user.name, value: user.userId }) })
                            }
                            onChange={values => setFieldValue('listUserAsign', values)}

                        >
                        </Select>
                    </div>
                    <div className="form-group">
                        <label>Time Tracking</label>
                        <Slider tooltipVisible max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} value={timeTracking.timeTrackingSpent} />
                        <div className="flex justify-between font-semibold">
                            <p>{timeTracking.timeTrackingSpent}h logged</p>
                            <p>{timeTracking.timeTrackingRemaining}h remaining</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-5">
                    <div className="form-group col-span-2">
                        <label>Original Estimate</label>
                        <input className="form-control" type="number" defaultValue='0' min="0" name="originalEstimate" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Time Spent</label>
                        <input className="form-control" type="number" defaultValue="0" min="0" name="timeTrackingSpent" onChange={e => {
                            setTimeTracking({ ...timeTracking, timeTrackingSpent: e.target.value })
                            setFieldValue('timeTrackingSpent', e.target.value)
                        }} />
                    </div>
                    <div className="form-group">
                        <label>Time Remaining</label>
                        <input className="form-control" type="number" defaultValue="0" min="0" name="timeTrackingRemaining" onChange={e => {
                            setTimeTracking({ ...timeTracking, timeTrackingRemaining: e.target.value })
                            setFieldValue('timeTrackingRemaining', e.target.value)
                        }} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <Editor
                        name="description"
                        apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
                        initialValue=""
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image",
                                "charmap print preview anchor help",
                                "searchreplace visualblocks code",
                                "insertdatetime media table paste wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
                        }}
                        onChange={handleEditorChange}
                    />
                </div>
                <Button className="mr-3">Cancel</Button>
                <button className="btn btn-primary" type="submit">Create Task</button>
            </form>
        </div>
    )
}

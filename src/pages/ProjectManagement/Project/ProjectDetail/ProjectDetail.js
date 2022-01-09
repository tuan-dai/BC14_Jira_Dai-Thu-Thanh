import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail } from "../../../../redux/actions/getAllProject";
import Loading from '../../../../_component/Loading/Loading';
import Content from "./Content";
import Info from "./Info";

export default function ProjectDetail(props) {

    //GET PROJECT DETAIL
    const id = props.match.params.id
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProjectDetail(id))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const projectDetail = useSelector(state => state.getAllProject_Reducer.data)
    console.log(projectDetail)
    const { loading } = useSelector(state => state.getAllProject_Reducer)

    return (

        <div className="w-full p-5">
            {loading ? <Loading /> : ''}
            <p className="text-3xl font-medium">Project {projectDetail?.projectName}</p>
            <Info projectDetail={projectDetail} />
            <Content projectDetail={projectDetail} />
        </div>

    );
}

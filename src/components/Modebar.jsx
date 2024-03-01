import { Segmented } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedMode } from "../store/modules/modebar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Modebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { selectedMode } = useSelector(state => state.modebar)
    const m = new Map()
    m.set('编辑器', 'editor')
    m.set('模拟器', 'simulator')
    m.set('验证器', 'verifier')
    console.log(selectedMode);
    useEffect(() => {
        navigate('/' + selectedMode)
    }, [])
    return (
        <div style={{ padding: '12px' }}>
            <Segmented
                options={['编辑器', '模拟器', '验证器']}
                onChange={
                    (value) => {
                        const mode = m.get(value)
                        dispatch(setSelectedMode(mode))
                        navigate('/' + mode)
                        // console.log(selectedMode);
                    }} />
        </div>
    )
}

export default Modebar
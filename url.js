const app = `https://www.jsjzx.top/smr-0.0.1`;

function encodeFilter(filter) {
    return encodeURIComponent(JSON.stringify(filter));
}
export const QRCType={
    meeting:200,
}
export default {
    //公司管理员登录
    adminLogin:()=>app+`/admin/Login`,
    //查看会议室预约安排
    searchArrange:(time,place_id)=>app+`/admin/OFindStaffAppointmentsInWeek?time=${time}&place_id=${place_id}`,
    //根据公司id获取公司所有会议室
    getMeetingRoomList:(companyId)=>app+`/admin/OFindPlacesByCompanyId?companyId=${companyId}`,

}

<template>
	<section>
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff;text-align: right;">
			<el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-button type="primary" v-on:click="editPassword">修改密码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="forgetPassword">忘记密码</el-button>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="AddUsers">添加</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->
		<el-col :span="24" style="background: #cab78c;height:48px;line-height: 48px;color: #fff;font-size: 16px;padding-left: 20px;">修改登录密码</el-col>

		<el-col v-if="forget === false" :span="24" style="margin-top: 40px;">
			<el-form :model="jiumima" label-width="100px" :rules="passwdForm" ref="jiumima">
				<el-form-item label="旧密码">
					<el-input type="password" v-model="jiumima.jiuPassword" auto-complete="off" style="width:320px;"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="password">
					<el-input type="password" v-model="jiumima.password" auto-complete="off" style="width:320px;"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码"  prop="checkPass">
					<el-input type="password" v-model="jiumima.checkPass" auto-complete="off" style="width:320px;"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button style="width: 300px;margin-left: 90px;margin-top: 20px;background: #cab78c;color: #fff;" @click.native="passwdUpEdit" :loading="editLoading">确认修改</el-button>
			</div>
			<!--<el-button style="margin-left: 350px" type="text" v-on:click="forgetPassword">忘记密码</el-button>-->
		</el-col>

		<el-col v-if="forget" :span="24" style="margin-top: 40px;">
			<el-form :model="yanzma" label-width="100px" :rules="passwdForm1" ref="yanzma">
				<el-form-item label="管理员账户">
					<el-input v-model="yanzma.mobileEmail" style="width:320px;"></el-input>
				</el-form-item>
				<el-form-item label="验证码">
					<el-input style="width:100px;" type="text" v-model="yanzma.vecode"></el-input>
					<el-button type="primary" @click.native="upvecodeBtn" >发送验证码</el-button>
				</el-form-item>
				<el-form-item label="新密码" type="password" prop="password">
					<el-input type="password" v-model="yanzma.password" style="width:320px;"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" type="password" prop="checkPass">
					<el-input type="password" v-model="yanzma.checkPass" style="width:320px;"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button style="width: 300px;margin-left: 90px;margin-top: 20px;background: #cab78c;color: #fff;" @click.native="yanzSubmit" :loading="editLoading">确认修改</el-button>
			</div>
			<el-button style="margin-left: 350px" type="text" v-on:click="editPassword">旧密码修改</el-button>
		</el-col>
	</section>
</template>

<script>
    import { state } from '../../vuex/state'
    import util from '../../common/js/util'
    import {baseUrl , editUser, addUser } from '../../api/api';

    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.jiumima.password !== '') {
                        this.$refs.jiumima.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.jiumima.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.yanzma.password !== '') {
                        this.$refs.yanzma.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.yanzma.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                jiumima:{
                    jiuPassword:'',
                    password:'',
                    checkPass:''
                },
                yanzma:{
                    mobileEmail:'',
                    vecode:'',
                    password:'',
                    checkPass:''
                },
                passwdForm:{
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                passwdForm1:{
                    password: [
                        { validator: validatePass3, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass1, trigger: 'blur' }
                    ]
                },
                adminPassodEdit: false,
                forget:false,
                checked: true,
                value:'',
                value1:'',
                value2:'',
                input:'',
                textarea:'',
                adduserVisible:false,
                selectSubjectStatus: [
                    {
                        value:'0',
                        label:'全部'
                    },{
                        value:'1',
                        label:'待付款'
                    },{
                        value:'2',
                        label:'待发货'
                    },{
                        value:'3',
                        label:'已发货'
                    },{
                        value:'4',
                        label:'待评价'
                    },{
                        value:'5',
                        label:'退货'
                    }],
                options: [{
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '订单编号'
                }, {
                    value: '2',
                    label: '快递单号'
                }, {
                    value: '3',
                    label: '用户名'
                }],
                filters: {
                    name: '',
                    status:'',
                    type:''
                },
                users: [],
                total: 100,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    username: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                //新增界面数据
                orderDetails: {
                },
                orderInformation:[{
                    orderNumber :'145877458784524c',
                    courierNumber :'145877458784524c',
                    userName:'吸引力量',
                    amountPaid :'300',
                    orderTotal :'900',
                    orderStatus :'待付款',
                    paymentMethod :'微信支付',
                    creationTime:'2017-09-08 17:09',
                    deliveryTime:'2017-09-08 17:09',
                    commodityName:'雨花说'
                }]
            }
        },
        methods: {
            //修改密码
            editPassword(){
                this.forget = false
            },
            passwdUpEdit(){
                const _this = this
                const params = {
                    type:2,
                    password:this.jiumima.jiuPassword,
                    newPassword:this.jiumima.password
                }
                console.log(params)
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+"/api/coreUser/resetPassword",
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    success:function(data){
                        console.log(data)
                        if(data.code === 1){
                            _this.adminPassodEdit = false
                            _this.$router.push({ path: '/login' })
                            // alert(data.msg)
                        }else{
                            alert(data.msg)
                            // _this.$message.error();
                        }
                    }
                })
            },
            //忘记密码
            forgetPassword(){
                this.forget = true
            },
            // 发送验证码
            upvecodeBtn(){
                const params = {
                    mobileEmail:this.yanzma.mobileEmail
                }
                console.log(params)
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+"/api/coreUser/sendMsmOrEmail/7",
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    success:function(data){
                        console.log(data)
                        alert(data.msg)
                    }
                })
            },
            yanzSubmit(){
                const _this = this
                const params = {
                    mobileEmail:this.yanzma.mobileEmail,
                    password:this.yanzma.password,
                    vecode:this.yanzma.vecode
                }
                console.log(params)
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+"/api/admin/coreAdmin/updatePwByVecode",
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    success:function(data){
                        console.log(data)
                        if(data.code === 1){
                            _this.forget = false
                            _this.$router.push({ path: '/login' })
                        }else{
                            alert(data.msg)
                        }
                    }
                })
            },
            getlist(){
                const _this = this
                _this.table = []
                const params = {
                    accountId:'1',
                    accessToken:'',
                    resourceType:'',
                    page:{
                        pageNum:_this.page,
                        pageSize:'10'
                    }
                }
                console.log(params)
                $.post(baseUrl+"/admin/banner/getBannerByPage",
                    { param: JSON.stringify(params) },
                    function(data){
                        const info = eval('(' + data + ')');
                        const response = JSON.parse(info);
                        const list = response.obj.results
                        console.log(response)
                        // _this.page = response.obj.total
                        _this.total = response.obj.totalRecord
                        for(var i = 0;i<list.length;i++){
                            _this.table.push(list[i])
                        }
                    }
                )
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            seeBtn: function (index, row) {
                this.editFormVisible = true;
                this.orderDetails = Object.assign({}, row);
            },
            //显示新增界面
            AddUsers: function () {
                this.adduserVisible = true;
            },
            //编辑
//            editSubmit: function () {
//                this.$refs.editForm.validate((valid) => {
//                    if (valid) {
//                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
//                            this.editLoading = true;
//                            //NProgress.start();
//                            let para = Object.assign({}, this.editForm);
//                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
//                            editUser(para).then((res) => {
//                                this.editLoading = false;
//                                //NProgress.done();
//                                this.$message({
//                                    message: '提交成功',
//                                    type: 'success'
//                                });
//                                this.$refs['editForm'].resetFields();
//                                this.editFormVisible = false;
//                                this.getUsers();
//                            });
//                        });
//                    }
//                });
//            },
            //新增
//            addSubmit: function () {
//                this.$refs.addForm.validate((valid) => {
//                    if (valid) {
//                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
//                            this.addLoading = true;
//                            //NProgress.start();
//                            let para = Object.assign({}, this.addForm);
//                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
//                            addUser(para).then((res) => {
//                                this.addLoading = false;
//                                //NProgress.done();
//                                this.$message({
//                                    message: '提交成功',
//                                    type: 'success'
//                                });
//                                this.$refs['addForm'].resetFields();
//                                this.adduserVisible = false;
//                                this.getUsers();
//                            });
//                        });
//                    }
//                });
//            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            // this.getlist();
        }
    }

</script>

<style>
	.el-dialog--small {
		width: 25%;
		border-radius: 10px
	}
</style>
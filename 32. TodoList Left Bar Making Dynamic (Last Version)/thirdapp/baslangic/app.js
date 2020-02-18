const app = new Vue({
    el: '#app',
    name: 'Uzaktan Kurs',
    data: {
        dataList:[
            {Id:1,Title:'React Js',Status:false,List:'Frontend'},
            {Id:2,Title:'Angular',Status:true,List:'Frontend'},
            {Id:3,Title:'React Native',Status:false,List:'Cross Platform'},
            {Id:4,Title:'Flutter',Status:true,List:'Cross Platform'},
            {Id:5,Title:'Kotlin',Status:true,List:'Native'}
        ],
        dataItem:{Title:'',Status:false},
        ListCategoryItem:[
            {Id:1,Title:'Native'},
            {Id:2,Title:'Cross Platform'},
            {Id:3,Title:'Frontend'},
        ],
        activeListItem:{},
        filteredDataList:[],
        newListCategoryItem:{}
    },
    created(){
        const defaultListItem=this.ListCategoryItem[0];
        if(defaultListItem!=null)
        {
            this.changeListItem(defaultListItem.Id);
        }
    },
    methods:{
        toggleTodoListStatus(index){
            this.todoList[index].Status=!this.todoList[index].Status;
        },
        toggleTodoListFinishedStatus(index){
            this.todoListFinished[index].Status=!this.todoListFinished[index].Status;
        },
        saveItem(){
            if(this.dataItem.Title!=''){
                this.dataItem.Id=this.dataList.length+1;
                this.dataItem.List=this.activeListItem.Title; 
                this.dataList.push(this.dataItem);
                this.clearForm();
                this.changeListItem(this.activeListItem.Id);
            }
        },
        clearForm(){
            this.dataItem={Title:'',Status:false};
        },
        deleteItem(id){
            this.dataList=this.dataList.filter(todo=>todo.Id!=id);
            this.clearForm();
            this.changeListItem(this.activeListItem.Id);
        },
        changeListItem(id){
            const listItem=this.ListCategoryItem.find(x=>x.Id==id);
            if(listItem!=null)
            {
                this.activeListItem=listItem;
                this.filteredDataList=this.dataList.filter(item=>item.List==listItem.Title);
            }
        },
        SaveCategoryItem(){
            if(this.newListCategoryItem.Title!=null)
            {
                this.newListCategoryItem.Id=this.ListCategoryItem.length+1;
                this.ListCategoryItem.push(this.newListCategoryItem);
                this.newListCategoryItem={};
            }
        },
        ListItemCount(title){
            return this.dataList.filter(item=>item.List==title).length;
        }
    },
    computed:{
        todoList(){
            return this.filteredDataList.filter(todo=>todo.Status==false);
        },
        todoListFinished(){
            return this.filteredDataList.filter(todo=>todo.Status==true);
        }
    }
})
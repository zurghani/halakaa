import {
    UserOutlined,
    TeamOutlined,
    ApartmentOutlined,
    ContactsOutlined,
    BarChartOutlined,
    SettingOutlined,
} from '@ant-design/icons';


export const NAV_LINKS:any = {
    Admin: [
      { name: 'student', icon: UserOutlined, dropdown: [{label:'create'}, {label:'find'}]},
      { name: 'teacher', icon: TeamOutlined, dropdown: [{label:'create'}, {label:'find'}]},
      { name: 'class', icon: ApartmentOutlined, dropdown: [{label:'create'}, {label:'find'}]},
      { name: 'user', icon: ContactsOutlined, dropdown: [{label:'create'}, {label:'find'}]},
      { name: 'reports', icon: BarChartOutlined },
      { name: 'system settings', icon: SettingOutlined }
    ],
    Teacher: [
      { name: 'student', icon: UserOutlined, dropdown: [{label:'find'}]},
      { name: 'class', icon: ApartmentOutlined, dropdown: [{label:'find'}]},
      { name: 'reports', icon: BarChartOutlined  },
      { name: 'settings', icon: SettingOutlined  }
    ],
  };
  
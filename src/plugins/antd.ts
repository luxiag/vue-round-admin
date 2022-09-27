import { Modal, Table, Menu, Input, Form, Button, Row, Col, DatePicker } from 'ant-design-vue';
import type { App } from 'vue';

import 'ant-design-vue/dist/antd.variable.min.css';

export function setupAntd(app: App) {
  app
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Input)
    .use(Form)
    .use(Button)
    .use(Row)
    .use(Col)
    .use(DatePicker);
}

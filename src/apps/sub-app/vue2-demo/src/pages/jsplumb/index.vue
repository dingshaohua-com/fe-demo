<template>
    <div class="jsplumb">
      <div class="tables mt-10">
        <el-table
         
          :data="tableData1"
          :stripe="true"
          :border="true"
           class="left-table"
          style="width: 40%"
          size="small"
          :row-class-name="({ row }) => `demo-row left-${row.id}`"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="address" label="地址" />
        </el-table>
  
        <el-table
          :data="tableData2"
          :stripe="true"
          :border="true"
          style="width: 46%"
          size="small"
          :row-class-name="({ row }) => `demo-row right-${row.id}`"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="address" label="地址" />
        </el-table>
      </div>
      <div class="mt-6">
        <el-button type="primary" @click="getConnecteds()"> 获取连接 </el-button>
        <div class="mt-2">
          <hljsVuePlugin.component
            language="js"
            :code="`const result = ${currentConnections}`"
          />
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import hljsVuePlugin from "@highlightjs/vue-plugin";
  import { onMounted, ref } from "vue";
  import { tableData1, tableData2, connecteds } from "./helper";
  import { ready, newInstance, EVENT_ENDPOINT_CLICK } from "@jsplumb/browser-ui";
  
  let jsplumb;
  // 回显已经链接的
  const createConnecteds = (connecteds) => {
    for (const connected of connecteds) {
      const startNodeId = ".left-" + connected.source;
      const startNode = document.querySelector(startNodeId);
      let startEp = jsplumb.getEndpoints(startNode)[0];
      if (!startEp) {
        startEp = jsplumb.addEndpoint(startNode, {
          source: true,
          endpoint: "Dot",
          anchor: "Left",
          parameters: {
            // 自定义参数
            customId: startNodeId,
          },
        });
      }
  
      const endNodeId = ".right-" + connected.target;
      const endNode = document.querySelector(endNodeId);
      let endEp = jsplumb.getEndpoints(endNode)[0];
      if (!endEp) {
        endEp = jsplumb.addEndpoint(endNode, {
          target: true,
          endpoint: "Rectangle",
          anchor: "Right",
          parameters: {
            // 自定义参数
            customId: endNodeId,
          },
        });
      }
  
      jsplumb.connect({
        source: startEp,
        target: endEp,
      });
    }
  };
  
  // 注册端点：如果两个表之间的数据都能连接起来，那就必须将对应的row注册为端点
  const regesterEndpoint = () => {
    for (let index = 0; index < tableData1.length; index++) {
      const startNodeId = ".left-" + tableData1[index].id;
      const startNode = document.querySelector(startNodeId);
      const endNodeId = ".right-" + tableData2[index].id;
      const endNode = document.querySelector(endNodeId);
      jsplumb.addEndpoint(startNode, {
        source: true,
        endpoint: "Dot",
        anchor: "Right",
        parameters: {
          // 自定义参数
          customId: startNodeId,
        },
      });
      jsplumb.addEndpoint(endNode, {
        target: true,
        endpoint: "Rectangle",
        anchor: "Left",
        parameters: {
          // 自定义参数
          customId: endNodeId,
        },
      });
    }
    // 监听点击端点事件
    jsplumb.bind(EVENT_ENDPOINT_CLICK, (endpoint, originalEvent) => {
      let dataIdClass = endpoint.parameters.customId;
      dataIdClass = dataIdClass.substring(1);
  
      // 根据端点查找到对应的表格row
      const findNode: HTMLDivElement = document.querySelector(
        `tr[class*="${dataIdClass}"]`
      );
  
      if (dataIdClass.startsWith("left-")) {
        // 移除所有的activeElement
        const leftTableTrs = document.querySelectorAll(".left-table tr");
        for (let i = 0; i < leftTableTrs.length; i++) {
          const tr = leftTableTrs[i];
          const activeElement = tr.querySelector(".activeElement");
          if (activeElement) {
            activeElement.remove();
          }
        }
  
        const activeElement = document.createElement("div");
        activeElement.className = "activeElement";
        activeElement.dataset.id = dataIdClass;
        activeElement.style.width = findNode.offsetWidth + "px";
        activeElement.style.height = findNode.offsetHeight + "px";
        findNode.appendChild(activeElement);
      } else {
        // 获取左侧的activeElement，并链接到此
        const activeElement: HTMLDivElement =
          document.querySelector(".activeElement");
        if (activeElement) {
          // activeElement对应的端点
          const allEp = jsplumb.selectEndpoints();
          const sourceEp = allEp.entries.find(
            (item) => item.parameters.customId === "." + activeElement.dataset.id
          );
  
          // 要保证自己没有链接别人 和 目标端点没有被链接，才能接续下一步
          const connections = jsplumb.getConnections();
          connections.forEach((con) => {
            const [startEp, endEp] = con.endpoints;
            if (startEp.parameters.customId === sourceEp.parameters.customId) {
              jsplumb.deleteConnection(con);
            }
            if (endEp.parameters.customId === endpoint.parameters.customId) {
              jsplumb.deleteConnection(con);
            }
          });
          // 创建新的链接
  
          jsplumb.connect({
            source: sourceEp,
            target: endpoint,
          });
          activeElement.remove();
        }
      }
    });
  };
  
  // 初始化
  const initJsplumb = () => {
    ready(() => {
      // 创建jsplumb实例
      jsplumb = newInstance({
        container: document.querySelector(".tables"),
      });
  
      // 回显连接过的数据
      regesterEndpoint();
      createConnecteds(connecteds);
    });
  };
  
  // 获取链接的信息
  const currentConnections = ref("[ ]");
  const getConnecteds = () => {
    const connections = jsplumb.getConnections("*");
    const res = [];
    for (const connection of connections) {
      const [startEp, endEp] = connection.endpoints;
      const map = {
        source: startEp.parameters.customId,
        target: endEp.parameters.customId,
      };
      res.push(map);
    }
    currentConnections.value = JSON.stringify(res, null, 2);
  };
  
  onMounted(() => {
    initJsplumb();
  });
  </script>
  
  <style scoped>
  .app {
    margin: auto;
    width: 960px;
  }
  .tables {
    position: relative;
    display: flow-root;
  }
  .el-table:nth-of-type(1) {
    float: left;
  }
  .el-table:nth-of-type(2) {
    float: right;
  }
  </style>
  
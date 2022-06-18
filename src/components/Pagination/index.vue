<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('Pagination', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="middle.start >= 2"
      @click="$emit('Pagination', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="middle.start >= 3">···</button>

    <template v-for="(page, index) in middle.end">
      <button
        v-if="page >= middle.start"
        :key="index"
        @click="$emit('Pagination', page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </template>

    <button v-if="middle.end <= this.last - 2">···</button>
    <button
      v-if="middle.end <= this.last - 1"
      @click="$emit('Pagination', last)"
      :class="{ active: pageNo == last }"
    >
      {{ last }}
    </button>
    <button :disabled="pageNo == last" @click="$emit('Pagination', pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    last() {
      return Math.ceil(this.total / this.pageSize);
    },
    middle() {
      let { pageNo, pageSize, total, continues } = this;
      let start = 1;
      let end = this.last;
      if (continues > this.last) {
        start = 1;
        end = this.last;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > this.last) {
        start = this.last - continues + 1;
        end = this.last;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

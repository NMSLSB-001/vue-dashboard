<template>
  <div class="chart_container">
    <div class="chart_container_upper">
      <div class="classAna_container">
        <div class="date_select_container">
          <span> {{ titleOfChart_1 }} &nbsp;</span>
          <span class="date_select"></span>
          <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="Date Select"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            @change="(value) => dateChangeHandler(value)"
            style="width: 150px"
          >
          </el-date-picker>
        </div>
        <div class="classAna_chart" id="classAna"></div>
      </div>
    </div>
    <div class="numofCar_chart_container">
      <div class="week_select_container">
        <span> {{ titleOfChart_2 }} &nbsp;</span>
        <span class="week_select"></span>
        <el-select
          v-model="weekValue"
          placeholder=""
          @change="(value) => weekChangeHandler(value)"
        >
          <el-option
            v-for="item in weekOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="numofCar_chart" id="numofCar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      titleOfChart_1: "Number of Vehicle detected of each year's student on ",
      titleOfChart_2: 'Number of Vehicle detected within a week during ',
      numberInfoForm: [
        { date: '2022-06-01', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-02', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-03', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-04', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-05', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-06', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-07', number: [0, 0, 0, 0, 1, 0] },
        { date: '2022-06-08', number: [0, 0, 0, 0, 1, 1] },
        { date: '2022-06-09', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-10', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-11', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-12', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-13', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-14', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-15', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-16', number: [0, 0, 0, 12, 21, 19] },
        { date: '2022-06-17', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-18', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-19', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-20', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-21', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-22', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-23', number: [0, 0, 0, 8, 18, 21] },
        { date: '2022-06-24', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-25', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-26', number: [0, 0, 0, 0, 0, 0] },
        { date: '2022-06-27', number: [0, 0, 0, 0, 0, 0] }
      ],
      barChartValue: [],
      year: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
      dateValue: '',
      disabledDate (time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: 'Yesterday',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: 'A week ago',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ],
      weekValue: '',
      weekOptions: [],
      //
      carInfoForm: [
        {
          numofCarAft: [0, 0, 0, 50, 0, 0, 0],
          numofCarEve: [0, 0, 0, 0, 0, 0, 0],
          dateofAWeek: [
            '2022-06-13',
            '2022-06-14',
            '2022-06-15',
            '2022-06-16',
            '2022-06-17',
            '2022-06-18',
            '2022-06-19'
          ]
        },
        {
          numofCarAft: [0, 0, 0, 47, 0, 0, 0],
          numofCarEve: [0, 0, 0, 0, 0, 0, 0],
          dateofAWeek: [
            '2022-06-20',
            '2022-06-21',
            '2022-06-22',
            '2022-06-23',
            '2022-06-24',
            '2022-06-25',
            '2022-06-26'
          ]
        }
      ],
      lineChartForm: {
        numofCarAft: [],
        numofCarEve: [],
        date: []
      },
      week: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      dialogVisible: false
    }
  },
  created () {
    const currentIndex = '/dashboard'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))

    this.getDate()
    this.getWeek()
    this.getDataByDate()
    this.getDataByWeek()
  },
  mounted () {
    this.cleanEChartsCache()
    this.classAnaChart()
    this.numofCarChart()
  },
  methods: {
    getDate () {
      // get current date in YYYY-MM-DD format
      var data = new Date()
      var month =
        data.getMonth() < 9 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1
      var date = data.getDate() <= 9 ? '0' + data.getDate() : data.getDate()
      this.dateValue = data.getFullYear() + '-' + month + '-' + date
    },
    getDataByDate () {
      for (var i in this.numberInfoForm) {
        if (this.numberInfoForm[i].date === this.dateValue) {
          this.barChartValue = this.numberInfoForm[i].number
        }
      }
    },
    getWeek () {
      for (var i in this.carInfoForm) {
        const insertItem = {
          value: this.carInfoForm[i].dateofAWeek[0],
          label:
            this.carInfoForm[i].dateofAWeek[0] +
            ' - ' +
            this.carInfoForm[i].dateofAWeek[6]
        }
        this.weekOptions.push(insertItem)
      }
      var largest = Object.keys(this.carInfoForm).length - 1
      this.weekValue = this.carInfoForm[largest].dateofAWeek[0]
    },
    getDataByWeek () {
      for (var i in this.carInfoForm) {
        if (this.carInfoForm[i].dateofAWeek[0] === this.weekValue) {
          for (var j = 0; j < 7; j++) {
            this.lineChartForm.date[j] =
              this.week[j] +
              '\n\n' +
              '(' +
              this.carInfoForm[i].dateofAWeek[j] +
              ')'
            this.lineChartForm.numofCarAft[j] =
              this.carInfoForm[i].numofCarAft[j]
            this.lineChartForm.numofCarEve[j] =
              this.carInfoForm[i].numofCarEve[j]
          }
        }
      }
    },
    cleanEChartsCache () {
      // The dom element of echarts has an attribute: _echarts_instance_, same as id,
      // needs to be regenerated every refresh
      document.getElementById('classAna').removeAttribute('_echarts_instance_')
      document.getElementById('numofCar').removeAttribute('_echarts_instance_')
    },
    dyTrafficFlowChart () {
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById('dyTrFlow')
      )
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById('classAna'))
      }
    },
    classAnaChart () {
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById('classAna')
      )
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById('classAna'))
      }

      var option = {
        title: {},
        xAxis: {
          type: 'category',
          data: this.year
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.barChartValue,
            type: 'bar'
          }
        ]
      }

      myChart.setOption(option)
    },
    // get date from date picker
    dateChangeHandler (value) {
      console.log(value)
      this.dateValue = value
      this.getDataByDate()
      this.classAnaChart()
    },
    // get week from week selector
    weekChangeHandler (value) {
      console.log(value)
      this.weekValue = value
      this.getDataByWeek()
      this.numofCarChart()
    },
    //
    numofCarChart () {
      var lineChartForm = this.lineChartForm
      // console.log(lineChartForm.date)
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById('numofCar')
      )
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById('numofCar'))
      }
      // set the configuration and data of the chart
      var option = {
        title: {},
        tooltip: {},
        legend: {
          data: ['Afternoon Session', 'Evening Session']
        },
        xAxis: {
          data: lineChartForm.date
        },
        yAxis: {},
        series: [
          {
            name: 'Afternoon Session',
            type: 'line',
            stack: 'Total',
            data: lineChartForm.numofCarAft,
            itemstyle: {},
            label: {
              show: true,
              position: 'left',
              formatter: function (data) {
                return data.value
              }
            }
          },
          {
            name: 'Evening Session',
            type: 'line',
            data: lineChartForm.numofCarEve,
            itemstyle: {},
            label: {
              show: true,
              position: 'right',
              formatter: function (data) {
                return data.value
              }
            }
          }
        ]
      }
      // use the configuration and data to show chart
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.chart_container {
  width: 1500px;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.chart_container_upper {
  width: 80%;
  height: 400px;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.classAna_container {
  width: 60%;
  height: 350px;
  position: relative;
  background-color: aliceblue;
  .date_select_container {
    width: 100%;
    padding-top: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      font-size: 20px;
    }
  }
  .classAna_chart {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.numofCar_chart_container {
  width: 80%;
  height: 350px;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  background-color: aliceblue;
  .week_select_container {
    width: 100%;
    padding-top: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      font-size: 20px;
    }
  }
  .numofCar_chart {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

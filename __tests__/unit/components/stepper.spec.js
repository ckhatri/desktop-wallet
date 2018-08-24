import { mount } from '@vue/test-utils'
import { Stepper, StepperItem } from '@/components/stepper'

describe('Stepper', () => {
  describe('Item', () => {
    it('should render', () => {
      const wrapper = mount(StepperItem, {
        propsData: {
          title: 'Test',
          step: 1
        }
      })
      expect(wrapper.contains('.stepper-item')).toBeTruthy()
    })

    it('should toggle visibility', () => {
      const wrapper = mount(StepperItem, {
        propsData: {
          title: 'Test',
          step: 1
        }
      })
      wrapper.vm.toggle(1)
      expect(wrapper.vm.isActive).toBe(true)
    })

    it('should emit back event', async () => {
      const wrapper = mount(StepperItem, {
        propsData: {
          title: 'Test',
          step: 1
        }
      })
      wrapper.vm.toggle(1)
      const back = wrapper.find('.back-button')
      back.trigger('click')
      expect(wrapper.emitted('back')).toBeTruthy()
    })

    it('should emit next event', async () => {
      const wrapper = mount(StepperItem, {
        propsData: {
          title: 'Test',
          step: 1,
          isNextEnabled: true
        }
      })
      wrapper.vm.toggle(1)
      const next = wrapper.find('.next-button')
      next.trigger('click')
      expect(wrapper.emitted('next')).toBeTruthy()
    })
  })

  describe('Root', () => {
    it('should render', () => {
      const wrapper = mount(Stepper)
      expect(wrapper.contains('.stepper')).toBeTruthy()
    })
  })
})
